import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend } from "recharts";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { api } from "../api";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Summary() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  // Calculate total income and expense
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // PieChart data
  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
  const pieColors = ["#4f46e5", "#dc2626"];

  // BarChart data
  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total Amount (₹)",
        data: [income, expense],
        backgroundColor: ["#4f46e5", "#dc2626"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="container">
      <h2>Summary</h2>
      <div className="chart-container" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
        {/* PieChart */}
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center", marginBottom: 16 }}>Income vs Expense (Pie)</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <ReTooltip />
            <ReLegend />
          </PieChart>
        </div>

        {/* BarChart */}
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", minWidth: 300 }}>
          <h3 style={{ textAlign: "center", marginBottom: 16 }}>Income vs Expense (Bar)</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
