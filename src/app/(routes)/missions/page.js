import { MissionCard } from "./components";

export default function MissionsPage() {
  const sampleMissions = [
    { id: 1, name: "Artemis I", status: "Completed" },
    { id: 2, name: "Mars Observer", status: "Planned" },
    { id: 3, name: "Voyager II", status: "Ongoing" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Missions Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </main>
  );
}
