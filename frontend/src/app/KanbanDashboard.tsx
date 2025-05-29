import { KanbanBoard } from "@/components/ui/kanban/KanbanBoard";
import { H1 } from "@/components/typography";
import { ChevronsUpDown, KanbanIcon, NotebookIcon, EllipsisVertical, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function KanbanDashboard() {
  return (
    <>
      <Tabs defaultValue="kanban" className="w-full">
        {/* Top Header with TabsList */}
        <div className="flex items-center justify-between mb-4 text-white">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <H1>Project Name</H1>
            <ChevronsUpDown className="h-8 w-8 translate-y-[5px]" />
          </div>
          <div className="flex items-center gap-4 translate-y-[5px]">
            <TabsList className="h-[40px] gap-2">
              <TabsTrigger value="kanban" className="group">
                <KanbanIcon className="size-5 text-muted-foreground group-data-[state=active]:text-white" />
              </TabsTrigger>
              <TabsTrigger value="meetingMinutes" className="group">
                <NotebookIcon className="size-5 text-muted-foreground group-data-[state=active]:text-white" />
              </TabsTrigger>
            </TabsList>
            <EllipsisVertical className="h-8 w-8" />
          </div>
        </div>
        {/* Main Page Content */}
        <div className="w-full">
          <TabsContent value="kanban">
            <KanbanBoard />
          </TabsContent>
          <TabsContent value="meetingMinutes">
            <p className="text-white">Meeting minutes content goes here.</p>
          </TabsContent>
        </div>

        
      </Tabs>
      <button
        className="absolute bottom-6 right-6 z-50 bg-white text-black w-12 h-12 flex items-center justify-center rounded-md shadow-lg hover:shadow-xl transition"
        aria-label="Add new task"
      >
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}

export default KanbanDashboard;
