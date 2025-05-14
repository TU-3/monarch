import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2Icon, Pencil, RefreshCwIcon, CopyIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function OrgConfigModal({ orgInfo }: { orgInfo: { id: number, name: string } }) {
  const [orgName, setOrgName] = useState(orgInfo.name)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  function handleSaveOrg() {
    fetch(`${import.meta.env.VITE_API_PROXY_URL}api/orgs/update/${orgInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orgName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update organization")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Organization updated:", data)
      })
      .catch((error) => {
        console.error("Error updating organization:", error)
      })
  }

  function finishEditingTitle() {
    handleSaveOrg()
    setIsEditingTitle(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Edit organization">
          <Settings2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {isEditingTitle ? (
              <Input
                className="flex-1 h-9 focus:outline-hidden "
                variant={"unstyled"}
                autoFocus
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                onBlur={finishEditingTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    finishEditingTitle()
                  }
                }}
              />
            ) : (
              <span>
                {orgName}
              </span>
            )}

            {!isEditingTitle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingTitle(true)}
                aria-label="Edit organization name"
              >
                <Pencil className="size-4" />
              </Button>
            )}
          </DialogTitle>

          <DialogDescription className="sr-only">
            Configure your organization.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-right">
              Org Id
            </Label>
            <div className="space-x-2 flex items-center">
              <Button className="flex justify-start flex-1 font-normal text-neutral-50 bg-neutral-800"
                onClick={() => {
                  navigator.clipboard.writeText(orgInfo.id.toString())
                }}>
                <CopyIcon />
                {orgInfo.id}
              </Button>
              <Button variant={"outline"} size={"icon"}><RefreshCwIcon /></Button>
            </div>

          </div>

        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => { isEditingTitle ? finishEditingTitle() : handleSaveOrg() }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OrgConfigModal
