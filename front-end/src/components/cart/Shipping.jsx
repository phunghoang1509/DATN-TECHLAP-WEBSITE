import React, { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import vietnamAbc from "./vietnamAbc";

const Shipping = () => {
  const countriesList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("Vietnam");
  const [countryCities, setCountryCities] = useState([]);
  const [countryDistricts, setCountryDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showVietnamInfo, setShowVietnamInfo] = useState(false);

  useEffect(() => {
    setCountry("Việt Nam");
  }, []);
  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setDistrict(shippingInfo.district);
      setZipCode(shippingInfo.zipCode);
      setPhoneNo(shippingInfo.phoneNo);
      setCountry(shippingInfo.country);
    }
  }, [shippingInfo]);

  useEffect(() => {
    if (country === "Vietnam") {
      setCountryCities(Object.keys(vietnamAbc));
      setShowVietnamInfo(true);
    } else {
      setShowVietnamInfo(false);
    }
  }, [country]);

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    if (country === "Vietnam") {
      setCountryDistricts(vietnamAbc[selectedCity] || []);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, district, phoneNo, zipCode, country })
    );
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Thông tin vận chuyển"} />
      <CheckoutSteps shipping />
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
            action="your_submit_url_here"
            method="post"
          >
            <h2 className="mb-4">Thông tin vận chuyển</h2>
            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Quốc gia
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList?.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                Tỉnh/Thành phố
              </label>
              <select
                id="city_field"
                className="form-select"
                name="city"
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                required
              >
                <option value="">Chọn Tỉnh/Thành Phố</option>
                {showVietnamInfo &&
                  countryCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="district_field" className="form-label">
                Quận/Huyện
              </label>
              <select
                id="district_field"
                className="form-select"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <option value="">Chọn Quận/Huyện</option>
                {showVietnamInfo &&
                  countryDistricts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Địa chỉ cụ thể
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              Tiếp Tục
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
