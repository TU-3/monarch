import { Kanban } from "lucide-react";
import { H2 } from "@/components/typography";


function KanbanDashboard() {
  return (
    <>
      <div className="bg-red-500 text-white p-4">
        <H2>Project Name</H2> {/* Temporary name */}
      </div>
      <Kanban />
    </>
  );
}

export default KanbanDashboard;
