import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

import AdminLayout from "../layout/AdminLayout";

import {
  useGetAdminUsersQuery,
  useUpdateStatusUserMutation,
} from "../../redux/api/userApi";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();

  const [updateUser, { error: updateError }] = useUpdateStatusUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (updateError) {
      toast.error(updateError?.data?.message);
    }
  }, [error, updateError]);

  const toggleUserStatus = (id, status, role) => {
    if (role === "admin") {
      toast.error("Không thể vô hiệu hóa tài khoản admin.");
      return;
    }
    const newStatus = status === "active" ? "deactive" : "active";

    // Hiển thị xác nhận trước khi thay đổi trạng thái
    const confirmToggle = window.confirm(
      `Bạn có chắc chắn muốn ${
        newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"
      } tài khoản này không?`
    );

    if (confirmToggle) {
      updateUser({ id, body: { status: newStatus } })
        .then(() => {
          toast.success(
            `Tài khoản đã ${
              newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"
            } thành công!`
          );
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    }
  };

  const setUsers = () => {
    const users = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.users?.forEach((user) => {
      users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        status: (
          <span
            className={
              user.status === "active" ? "toggle-active" : "toggle-deactive"
            }
          >
            {user.status === "active" ? "active" : "deactive"}
          </span>
        ),
        actions:
          user.role !== "admin" ? ( // Thêm điều kiện ở đây
            <>
              <Link
                to={`/admin/users/${user?._id}`}
                className="btn btn-outline-primary"
                disabled={isLoading}
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className={`btn ms-2 ${
                  user.status === "active" ? "toggle-active" : "toggle-deactive"
                }`}
                onClick={() =>
                  toggleUserStatus(user?._id, user?.status, user?.role)
                }
                disabled={isLoading}
              >
                {user.status === "active" ? (
                  <FaToggleOn size={24} />
                ) : (
                  <FaToggleOff size={24} />
                )}
              </button>
            </>
          ) : null,
      });
    });

    return users;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <h4 className="my-5 mt-0 pt-0">{data?.users?.length} Users</h4>

      <MDBDataTable data={setUsers()} className="px-3" bordered striped hover />
    </AdminLayout>
  );
};

export default ListUsers;
