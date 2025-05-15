import { useState } from "react"
import { useSession } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { toast } from "sonner"

function AddOrgModal({ onOrgChange }: { onOrgChange: () => void }) {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");

  const { session } = useSession();

  const handleCreateOrg = async (orgName: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_PROXY_URL}api/orgs/create/${session?.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orgName }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to create organization")
      }

      const data = await response.json()
      toast.success("Organization created successfully")

      handleJoinOrg(data.id) // Automatically join the organization after creating it
      setIsCreateDialogOpen(false)

    } catch (error) {
      console.error("Error creating organization:", error)
    }
  }

  const handleJoinOrg = async (orgId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_PROXY_URL}api/orgs/join/${session?.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orgId }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to join organization")
      }

      toast.success("Successfully joined Organization")

      onOrgChange();
      setIsJoinDialogOpen(false)

    } catch (error) {
      console.error("Error joining organization:", error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-neutral-50 text-neutral-950 flex justify-center items-center size-16 rounded-full">
          <Plus className="size-7" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Add an Organization</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setIsJoinDialogOpen(true)}>
            Join
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsCreateDialogOpen(true)}>
            Create
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Join Dialog */}
      <Dialog
        open={isJoinDialogOpen}
        onOpenChange={setIsJoinDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join an Organization</DialogTitle>
            <DialogDescription className="sr-only">
              Enter the organization ID to join an existing organization.
            </DialogDescription>
          </DialogHeader>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-right">
              Org Id
            </Label>
            <Input
              id="id"
              className="col-span-3"
              type="text"
              placeholder="asdfasdf"
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}

            />
          </div>

          <DialogFooter>
            <Button type="submit" onClick={() => handleJoinOrg(orgId)}>Join Org</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an Organization</DialogTitle>
            <DialogDescription className="sr-only">
              Enter the organization name to create a new organization.
            </DialogDescription>
          </DialogHeader>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-right">
              Org Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              type="text"
              placeholder="My Organization"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" onClick={() => handleCreateOrg(orgName)}>Create Org</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddOrgModal
