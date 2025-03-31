import React, { useState } from "react";
import axios from "axios";

const CategoryCreateComponent = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Gọi API
  const createCategory = async (category) => {
    try {
      setLoading(true);
      setMessage("");
      const { data } = await axios.post("/api/categories", { category });
      setMessage(
        `Category "${data.categoryCreated.name}" created successfully!`
      );
      setCategory(""); // Reset input sau khi tạo thành công
    } catch (error) {
      setMessage("Error creating category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      setMessage("Category name is required.");
      return;
    }
    createCategory(category);
  };

  return (
    <div style={styles.container}>
      <h2>Create Category</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

// CSS styles giữ nguyên
const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    color: "red",
    fontWeight: "bold",
  },
};

export default CategoryCreateComponent;
