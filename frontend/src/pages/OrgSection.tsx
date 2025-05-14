import { H4 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings2 } from "lucide-react";

type Organization = {
  id: number;
  name: string;
  owner: string;
  projects: Project[];
};

type Project = {
  id: number;
  name: string;
  description: string;
  organizationId: number;
};

type OrgSectionProps = {
  org: Organization;
};

function OrgSection(props: OrgSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <H4>{props.org.name}</H4>
        <Button variant="ghost" size="icon">
          <Settings2 />
        </Button>
      </div>
      <Separator className="mb-4" />
      <div className="grid grid-cols-3 gap-4">
        {props.org?.projects?.map((project) => (
          <Card key={project.id} className="w-full">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
        <Button
          variant="outline"
          className="w-1/2 border-dashed h-full"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export default OrgSection;
