import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

    return (
    <div className="container">
      <h2>Transactions</h2>
      <Link
        to="/add"
        className="button"
        style={{ marginBottom: "16px", display: "inline-block" }}
      >
        ➕ Add Transaction
      </Link>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        transactions.map((tx) => (
          <div className="card" key={tx._id}>
            <h3>{tx.type === "income" ? "💵 Income" : "💸 Expense"}</h3>
            <p>
              <strong>Amount:</strong> ₹{tx.amount}
            </p>
            <p>
              <strong>Category:</strong> {tx.category}
            </p>
            <p>
              <strong>Description:</strong> {tx.description || "-"}
            </p>
            <div className="card-buttons">
              <Link className="button" to={`/edit/${tx._id}`}>
                ✏️ Edit
              </Link>
              <button
                className="button button-danger"
                onClick={() => deleteTransaction(tx._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
