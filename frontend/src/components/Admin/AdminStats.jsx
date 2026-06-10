import { useEffect } from "react";
import useAdminStore from "../stores/useAdminStore";
import { formatPrice } from "../../utils";

const AdminStats = () => {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  const cards = [
    { title: "Total Orders", value: stats.totalOrders, color: "bg-blue-500" },
    {
      title: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      color: "bg-green-500",
    },
    { title: "Total Users", value: stats.totalUsers, color: "bg-purple-500" },
    {
      title: "Total Products",
      value: stats.totalProducts,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`${card.color} text-white rounded-lg shadow p-4`}
        >
          <h3 className="text-sm uppercase opacity-80">{card.title}</h3>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
