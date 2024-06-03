import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
import Order from "../models/order.js";
import { getOrderTemplates } from "../utils/emailOrderTemplates.js";
import sendEmail from "../utils/sendEmail.js";
const stripe = Stripe(
  "sk_test_51OtnIN00s3mvU7AiSjZTMcomzAe2yuAixKEsI1i5xVDWpMRy9WhI5ZZP2xldRDB2hwNVtlDqfUn1pCnCg9mghwO600mcvnzDef"
);

export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;

    const line_items = body?.orderItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: item?.price * 100,
        },
        tax_rates: ["txr_1Ow63c00s3mvU7AiJuNTmrXH"],
        quantity: item?.quantity,
      };
    });
    const shippingInfo = body?.shippingInfo;
    const shipping_rate =
      body?.itemsPrice >= 200
        ? "shr_1OwIEL00s3mvU7AiPHf3S6Gj"
        : "shr_1Ow5pQ00s3mvU7Ai9saVRgKX";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/me/orders?order_success=true`,
      cancel_url: `http://localhost:3000/`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id?.toString(),
      mode: "payment",
      metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
      shipping_options: [
        {
          shipping_rate,
        },
      ],
      line_items,
    });

    // Gửi email cho người đặt hàng
    const message = getOrderTemplates(
      req.user.name,
      body?.orderItems,
      body?.itemsPrice,
      body?.taxAmount,
      body?.shippingAmount,
      body?.totalAmount,
      body?.shippingInfo
    );
    await sendEmail({
      email: req.user.email,
      subject: "Xác nhận đơn hàng",
      message,
    });

    res.status(200).json({
      url: session.url,
    });
  }
);

const getOrderItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data?.length) {
        resolve(cartItems);
      }
    });
  });
};

export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      "whsec_62fb0445d557a506e9df9f6c523a6e3b22501194a92743376bf0f57cb235842c"
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(line_items);
      const user = session.client_reference_id;

      const totalAmount = session.amount_total / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const shippingAmount = session.total_details.amount_shipping / 100;
      const itemsPrice = session.metadata.itemsPrice;

      const shippingInfo = {
        address: session.metadata.address,
        city: session.metadata.city,
        district: session.metadata.district,
        phoneNo: session.metadata.phoneNo,
        zipCode: session.metadata.zipCode,
        country: session.metadata.country,
      };

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paymentMethod: "Card",
        user,
      };

      await Order.create(orderData);
      console.log(orderData);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Lỗi => ", error);
  }
});
