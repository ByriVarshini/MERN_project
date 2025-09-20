import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function EditTransaction() {
  const { id } = useParams();
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/transactions`);
        const tx = res.data.find((t) => t._id === id);
        if (tx) setForm(tx);
      } catch (err) {
        console.error("Error fetching transaction:", err);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/transactions/${id}`, form);
      navigate("/transactions");
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <div className="container">
      <h2>Edit Transaction</h2>
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

        <button type="submit" className="button">Update</button>
      </form>
    </div>
  );
}
