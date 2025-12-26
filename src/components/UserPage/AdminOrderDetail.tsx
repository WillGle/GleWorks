import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails, updateOrderStatus } from "../../api";
import "./AdminOrderDetail.css";

const paymentStatusOptions = ["Paid", "Pending", "Canceled"];
const orderStatusOptions = [
  "Finished",
  "Ongoing",
  "Pending",
  "Paused",
  "Canceled",
];

const isOrderArray = (data: unknown): data is any[] => Array.isArray(data);

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<any[] | null>(null);

  // Fetch order details from API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setOrderData([]);
        return; // Ngừng thực hiện nếu orderId không hợp lệ
      }
      try {
        const data = await getOrderDetails(orderId);
        // console.log("Fetched Order Data:", data);
        if (!isOrderArray(data)) {
          setOrderData([]);
          return;
        }
        setOrderData(data);
        // Lưu dữ liệu vào sessionStorage
        sessionStorage.setItem(`order_${orderId}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (!orderId) {
      setOrderData([]);
      return;
    }

    // Kiểm tra sessionStorage để lấy dữ liệu đã lưu
    const savedOrderData = sessionStorage.getItem(`order_${orderId}`);
    if (savedOrderData) {
      try {
        const parsed = JSON.parse(savedOrderData);
        if (isOrderArray(parsed)) {
          setOrderData(parsed);
          return;
        }
      } catch (error) {
        console.error("Error parsing saved order data:", error);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  // Handlers for updating the dropdown values
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setOrderData((prev) => {
      if (!Array.isArray(prev) || prev.length === 0) {
        return prev;
      }
      const updatedOrderData = prev.map((item: any, index: number) => {
        if (index === 0) {
          return {
            ...item,
            Order: {
              ...item.Order,
              [name]: value, // Cập nhật trường status hoặc paymentStatus
            },
          };
        }
        return item; // Giữ nguyên các phần tử khác
      });

      // Lưu vào sessionStorage
      if (orderId) {
        sessionStorage.setItem(
          `order_${orderId}`,
          JSON.stringify(updatedOrderData)
        );
      }
      return updatedOrderData;
    });
  };

  const handleSubmit = async () => {
    if (!orderId) {
      return;
    }
    if (!Array.isArray(orderData) || orderData.length === 0) {
      return;
    }
    const order = orderData[0]?.Order;
    if (!order) {
      return;
    }

    try {
      const updatedOrder = await updateOrderStatus(orderId, {
        status: order.status,
        paymentStatus: order.paymentStatus,
      });
      //   console.log("Updated Order:", updatedOrder);
      // Cập nhật lại orderData với dữ liệu mới
      setOrderData((prev: any) => {
        const newOrderData = [...prev];
        newOrderData[0] = {
          ...newOrderData[0],
          Order: {
            ...newOrderData[0].Order,
            status: updatedOrder.status, // Cập nhật trạng thái
            paymentStatus: updatedOrder.paymentStatus, // Cập nhật trạng thái thanh toán
          },
        };
        return newOrderData;
      });

      // Xóa dữ liệu trong sessionStorage
      sessionStorage.removeItem(`order_${orderId}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }
  if (orderData.length === 0) {
    return <div>No order details found.</div>;
  }

  //   console.log("Current Order Data:", orderData);

  return (
    <div className="order-detail-container">
      {/* Status Selection */}
      <div className="status-section">
        <h1>My Orders - Detail</h1>
        <div className="admin-status-selection">
          <div className="status-form-group">
            <label>Order Status</label>
            <select
              name="status" // Đặt tên cho trường status
              value={orderData[0].Order?.status || ""}
              onChange={handleStatusChange}
            >
              {orderStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="status-form-group">
            <label>Payment Status</label>
            <select
              name="paymentStatus" // Đặt tên cho trường paymentStatus
              value={orderData[0]?.Order?.paymentStatus || ""}
              onChange={handleStatusChange}
            >
              {paymentStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="button-status-form">
            <button type="button" className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="customer-info">
        <div className="order-form-group">
          <label>Order ID</label>
          <p>{orderData[0]?.orderId || "N/A"}</p>
        </div>
        <div className="order-form-group">
          <label>Customer</label>
          <p>{`${orderData[0]?.Order?.User?.firstName || "N/A"} ${
            orderData[0]?.Order?.User?.lastName || "N/A"
          }`}</p>
        </div>
        <div className="order-form-group">
          <label>Mail</label>
          <p>{orderData[0]?.Order?.User?.email || "N/A"}</p>
        </div>
        <div className="order-form-group">
          <label>Tel</label>
          <p>{orderData[0]?.Order?.telephone || "N/A"}</p>
        </div>
        <div className="order-form-group">
          <label>Address</label>
          <p>{orderData[0]?.Order?.address || "N/A"}</p>
        </div>
        <div className="order-form-group">
          <label>Order Date</label>
          <p>
            {orderData[0]?.Order?.createdAt
              ? new Date(orderData[0].Order.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      <hr />

      {/* Order Information */}
      <div className="order-info">
        {Array.isArray(orderData) &&
          orderData.map(
            (field: { id: string; fieldName: string; fieldValue: string }) => (
              <div className="order-form-group" key={field.id}>
                <label>{field.fieldName}</label>
                <p>{field.fieldValue || "N/A"}</p>
              </div>
            )
          )}
      </div>

      {/* Total Section */}
      <div className="admin-order-total-section">
        <h2>Total</h2>
        <p>
          {orderData[0]?.Order?.totalCost
            ? `${orderData[0].Order.totalCost.toLocaleString()} VND`
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
