import { Button, Card } from "@/components/ui";

export default function HelloWorldPage() {
  return (
    <main className="p-6 space-y-4">
      <Card title="Mission Overview">
        <p>This card demonstrates reusable UI patterns.</p>
        <div className="mt-4 space-x-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Card>
    </main>
  );
}
