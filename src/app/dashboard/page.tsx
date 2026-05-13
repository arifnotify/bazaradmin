export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 border">
          Products
        </div>

        <div className="p-4 border">
          Orders
        </div>

        <div className="p-4 border">
          Users
        </div>
      </div>
    </div>
  );
}