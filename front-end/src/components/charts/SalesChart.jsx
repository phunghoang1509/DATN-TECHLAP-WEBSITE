import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({
  salesData,
  topProducts,
  topUsers,
  topCategories,
}) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Doanh thu & Dữ liệu đơn hàng",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  const optionsTop = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Top sản phẩm ",
      },
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };
  const optionsUser = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Top người mua ",
      },
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  const optionsCategory = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Top thương hiệu",
      },
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  const labels = salesData?.map((data) => data?.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: salesData?.map((data) => data?.sales),
        borderColor: "#198753",
        backgroundColor: "rgba(42, 117, 83, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Đơn hàng",
        data: salesData?.map((data) => data?.numOrders),
        borderColor: "rgb(220, 52, 69)",
        backgroundColor: "rgba(201, 68, 82, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  const topLabels = topProducts?.map((product) => product.name);
  const topData = {
    labels: topLabels,
    datasets: [
      {
        label: "Số lượt bán (Top)",
        data: topProducts?.map((product) => product.count),
        borderColor: "rgb(220, 52, 69)",
        backgroundColor: "rgba(201, 68, 82, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  const userLabels = topUsers?.map((user) => user?.name);
  const userData = {
    labels: userLabels,
    datasets: [
      {
        label: "Số lượt mua (Top)",
        data: topUsers?.map((user) => user.count),
        borderColor: "rgb(22, 52, 69)",
        backgroundColor: "rgba(22, 68, 82, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  const categoryLabels = topCategories?.map((category) => category?.name);
  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Số lượt mua (Top)",
        data: topCategories?.map((category) => category.count),
        borderColor: "rgb(100, 200, 69)",
        backgroundColor: "rgba(100, 200, 82, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div style={{ display: "ruby-text" }}>
      <h2>Doanh Thu và Đơn hàng</h2>
      <Line options={options} data={data} />
      <h2>Top sản phẩm </h2>
      <Line options={optionsTop} data={topData} />
      <h2>Top người mua</h2>
      <Line options={optionsUser} data={userData} />
      <h2>Top thương hiệu</h2>
      <Line options={optionsCategory} data={categoryData} />
    </div>
  );
}
