import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { H2 } from "@/components/typography";
import { useSession } from "@/context/AuthContext";
import OrgSection from "@/pages/OrgSection";
import { Plus } from "lucide-react";
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

function OrgDashboard() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const { session } = useSession();

  useEffect(() => {
    const fetchOrganizationsAndProjects = async () => {
      try {
        const org_response = await fetch(
          import.meta.env.VITE_API_PROXY_URL + "api/orgs/" + session?.user.id
        );

        if (!org_response.ok) {
          throw new Error("Failed to fetch organizations of this user");
        }

        const org_data = await org_response.json();

        const orgProjects = await Promise.all(
          // Promise.all means do in parallel
          org_data.map(async (org: Organization) => {
            const project_response = await fetch(
              import.meta.env.VITE_API_PROXY_URL + "api/projects/" + org.id
            );

            if (!project_response.ok) {
              throw new Error("Failed to fetch projects of this organization");
            }
            const project_data = await project_response.json();
            return { ...org, projects: project_data };
          })
        );
        setOrgs(orgProjects);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    if (session?.user.id) {
      fetchOrganizationsAndProjects();
    }
  }, [session]);

  return (
    <>
      <div className="flex flex-col gap-6 mb-6">
        <H2>Welcome to Monarch</H2>
      </div>
      <div className="flex flex-col gap-6">
        {orgs.map((org) => (
          <OrgSection key={org.id} org={org} />
        ))}
      </div>
      <Button variant="default" className="fixed bottom-4 right-4 z-50">
        <span className="text-xl">
          <Plus />
        </span>
      </Button>
    </>
  );
}

export default OrgDashboard;
