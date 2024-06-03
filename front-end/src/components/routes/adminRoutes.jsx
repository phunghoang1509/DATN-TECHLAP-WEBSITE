import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import ProtectedRoute from "../auth/ProtectedRoute";
import ListProducts from "../admin/ListProducts";
import NewProduct from "../admin/NewProduct";
import UpdateProduct from "../admin/UpdateProduct";
import UploadImages from "../admin/UploadImages";
import ListUsers from "../admin/ListUsers";
import UpdateUser from "../admin/UpdateUser";
import ListOrders from "../admin/ListOrders";
import ProcessOrder from "../admin/ProcessOrder";
import ListCategory from "../admin/ListCategory";
import NewCategory from "../admin/NewCategory";
import UpdateCategory from "../admin/UpdateCategory";
import ListgraphicCard from "../admin/ListgraphicCard";
import NewgraphicCard from "../admin/NewgraphicCard";
import UpdategraphicCard from "../admin/UpdategraphicCard";
import ListHardDisk from "../admin/ListHardDisk";
import NewhardDisk from "../admin/NewhardDisk";
import UpdatehardDisk from "../admin/UpdatehardDisk";
import ListRam from "../admin/ListRam";
import NewRam from "../admin/NewRam";
import UpdateRam from "../admin/UpdateRam";
import ListCpu from "../admin/ListCpu";
import NewCpu from "../admin/NewCpu";
import UpdateCpu from "../admin/UpdateCpu";
import ListColor from "../admin/ListColor";
import NewColor from "../admin/NewColor";
import UpdateColor from "../admin/UpdateColor";
import ProductView from "../admin/ProductView";
import CategoryView from "../admin/CategoryView";
import GraphicCardView from "../admin/GraphicCardView";
import CpuView from "../admin/CpuView";
import ColorView from "../admin/ColorView";
import RamView from "../admin/RamView";
import HardDiskView from "../admin/HardDiskView";
import ProductReview from "../admin/ProductReview";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/new"
        element={
          <ProtectedRoute admin={true}>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id/upload_images"
        element={
          <ProtectedRoute admin={true}>
            <UploadImages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProductView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute admin={true}>
            <ListCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/category/new"
        element={
          <ProtectedRoute admin={true}>
            <NewCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/category/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories/:id"
        element={
          <ProtectedRoute admin={true}>
            <CategoryView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/graphicCards"
        element={
          <ProtectedRoute admin={true}>
            <ListgraphicCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/graphicCard/new"
        element={
          <ProtectedRoute admin={true}>
            <NewgraphicCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/graphicCard/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdategraphicCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/graphicCards/:id"
        element={
          <ProtectedRoute admin={true}>
            <GraphicCardView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hardDisks"
        element={
          <ProtectedRoute admin={true}>
            <ListHardDisk />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hardDisk/new"
        element={
          <ProtectedRoute admin={true}>
            <NewhardDisk />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/hardDisk/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdatehardDisk />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hardDisks/:id"
        element={
          <ProtectedRoute admin={true}>
            <HardDiskView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/rams"
        element={
          <ProtectedRoute admin={true}>
            <ListRam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ram/new"
        element={
          <ProtectedRoute admin={true}>
            <NewRam />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/ram/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateRam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/rams/:id"
        element={
          <ProtectedRoute admin={true}>
            <RamView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/cpus"
        element={
          <ProtectedRoute admin={true}>
            <ListCpu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/cpu/new"
        element={
          <ProtectedRoute admin={true}>
            <NewCpu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/cpu/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateCpu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/cpus/:id"
        element={
          <ProtectedRoute admin={true}>
            <CpuView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/colors"
        element={
          <ProtectedRoute admin={true}>
            <ListColor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/color/new"
        element={
          <ProtectedRoute admin={true}>
            <NewColor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/color/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateColor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/colors/:id"
        element={
          <ProtectedRoute admin={true}>
            <ColorView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <ListOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <ListUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute admin={true}>
            <ProductReview />
          </ProtectedRoute>
        }
      />
    </>
  );
};
export default adminRoutes;
