import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { authCheck, getUser, updateUser } from "../../api";
import "./MyAccount.css"; // Add your styles

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
  city: string;
}

const MyAccount: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    address: "",
    city: "",
  });

  // State for success or error messages
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("Fetched User ID:", userId); // Debugging line

    if (token && userId) {
      try {
        const savedUser = await getUser(userId);
        setFormData({
          id: savedUser.id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          phoneNumber: savedUser.phoneNumber,
          email: savedUser.email,
          dateOfBirth: savedUser.dateOfBirth,
          address: savedUser.address,
          city: savedUser.city,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Không thể lấy thông tin người dùng.");
      }
    } else {
      setMessage("Token or User ID is missing.");
    }
  }, []);

  const fetchUserId = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const userData = await authCheck();
        // Access the user ID correctly
        const userId = userData.user.id; // Adjusted to access the user ID
        localStorage.setItem("userId", userId); // Store user ID in local storage
        fetchUserData(); // Fetch user data after storing user ID
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setMessage("Error fetching user ID.");
      }
    } else {
      setMessage("Token is missing.");
    }
  }, [fetchUserData]);

  // Fetch user ID and user data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if token is not found
      navigate("/login");
      return;
    }
    fetchUserId(); // Fetch user ID if authenticated
  }, [fetchUserId, navigate]); // Add dependencies

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await updateUser(formData.id, formData);
      setMessage("Thông tin đã được cập nhật thành công!");
      fetchUserData(); // Fetch updated user data

      // Reset the message after a few seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating information:", error);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="my-account">
      <h1>My Account</h1>
      <p>Manage profile information for account security</p>
      <div className="account-form-container">
        <div className="account-form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Your First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="account-form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Your Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="account-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="account-form-group">
          <label>Telephone</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Your Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="account-form-group">
          <label>Date Of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Your Date of Birth (DD-MM-YYYY)"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="account-form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Your Default Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="account-form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Your City"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="submit-btn">
          Xác nhận
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default MyAccount;
