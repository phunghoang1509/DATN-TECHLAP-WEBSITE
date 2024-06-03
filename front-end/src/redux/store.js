import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import { categoryApi } from "./api/categoryApi";
import { authApi } from "./api/authApi";
import userReducer from "./features/userSlice";
import { userApi } from "./api/userApi";
import cartReducer from "./features/cartSlice";
import { orderApi } from "./api/orderApi";
import { colorsApi } from "./api/colorApi";
import { graphicCardApi } from "./api/graphicCards";
import { cpuApi } from "./api/cpuApi";
import { hardDiskApi } from "./api/hardDisk";
import { ramApi } from "./api/ram";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: userReducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [colorsApi.reducerPath]: colorsApi.reducer,
    [graphicCardApi.reducerPath]: graphicCardApi.reducer,
    [cpuApi.reducerPath]: cpuApi.reducer,
    [hardDiskApi.reducerPath]: hardDiskApi.reducer,
    [ramApi.reducerPath]: ramApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      categoryApi.middleware,
      colorsApi.middleware,
      graphicCardApi.middleware,
      cpuApi.middleware,
      hardDiskApi.middleware,
      ramApi.middleware,
      authApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

export default store;
