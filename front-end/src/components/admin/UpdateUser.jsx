import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const { data } = useGetUserDetailsQuery(params?.id);

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Cập nhật tài khoản thành công!");

      navigate("/admin/users");
      window.location.reload();
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };
    const confirmUpdate = window.confirm(
      "Bạn có chắc chắn cập nhật tài khoản không?"
    );
    if (confirmUpdate) {
      updateUser({ id: params?.id, body: userData });
    }
  };
  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Cập nhật người dùng"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h2 className="mb-4">Cập nhật người dùng</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Tên người dùng
              </label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="form-label">
                Vai trò
              </label>
              <select
                id="role_field"
                className="form-select"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Người dùng</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn update-btn w-100 py-2">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
