export default function MissionCard({ mission }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{mission.name}</h2>
      <p className="text-gray-500 mt-1">Status: {mission.status}</p>
    </div>
  );
}
