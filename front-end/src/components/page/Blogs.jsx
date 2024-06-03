import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-center text-black font-semibold mb-8">
        Trang tin tức sẽ sớm ra mắt!!!
      </h1>
      <div>
        <img
          src="https://repository-images.githubusercontent.com/279611541/b7e1e580-c611-11ea-9b24-523c65baea0e"
          alt="Coming Soon"
          className="mb-8 w-48 h-auto"
          style={{ maxWidth: "50%" }}
        />
      </div>
      <Link to={`/`}>
        <Button type="primary"> Quay lại trang chủ</Button>
      </Link>
    </div>
  );
};

export default Blogs;
