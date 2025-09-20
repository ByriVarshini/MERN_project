import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", form);
      navigate("/transactions");
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <div className="container">
      <h2>Add Transaction</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="type">Type</label>
          <select
            className="form-input"
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="amount">Amount</label>
          <input
            className="form-input"
            id="amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">Category</label>
          <input
            className="form-input"
            id="category"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <input
            className="form-input"
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="button">Add</button>
      </form>
    </div>
  );
}
