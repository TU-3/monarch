import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Settings2Icon,
  Pencil,
  RefreshCwIcon,
  CopyIcon,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSession } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type OrgConfigModalProps = {
  orgInfo: {
    id: number;
    name: string;
    owner: number;
  };
  onOrgChange: () => void;
};

type Member = {
  id: number;
  email: string;
};

function OrgConfigModal({ orgInfo, onOrgChange }: OrgConfigModalProps) {
  const [orgName, setOrgName] = useState(orgInfo.name);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const { session } = useSession();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    getMembers(orgInfo.id.toString());
    setIsOwner(orgInfo.owner.toString() === session?.user.id);
  }, [orgInfo, session]);

  async function handleSaveOrg() {
    fetch(
      `${import.meta.env.VITE_API_PROXY_URL}api/orgs/update/${orgInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orgName }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update organization");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Organization updated successfully");
        onOrgChange();
      })
      .catch((error) => {
        console.error("Error updating organization:", error);
      });
  }

  function finishEditingTitle() {
    handleSaveOrg();
    setIsEditingTitle(false);
  }

  const getMembers = async (orgId: string) => {
    fetch(`${import.meta.env.VITE_API_PROXY_URL}api/users/${orgId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        return response.json();
      })
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  };

  const handleDeleteOrg = async () => {
    fetch(
      `${import.meta.env.VITE_API_PROXY_URL}api/orgs/delete/${orgInfo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete organization");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Organization deleted successfully");
        onOrgChange();
      })
      .catch((error) => {
        console.error("Error deleting organization:", error);
      });
  };

  const handleLeaveOrg = async () => {
    await fetch(
      `${import.meta.env.VITE_API_PROXY_URL}api/orgs/leave/${session?.user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orgId: orgInfo.id }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to leave organization");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Left organization successfully");
        onOrgChange();
      })
      .catch((error) => {
        console.error("Error leaving organization:", error);
      });
  };

  const handleDeleteMember = async (memberId: number) => {
    if (!isOwner) {
      toast.error("Only owners can delete members");
      return;
    }
    await fetch(
      `${import.meta.env.VITE_API_PROXY_URL}api/orgs/leave/${memberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orgId: orgInfo.id }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete member");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Member deleted successfully");
        getMembers(orgInfo.id.toString());
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
      });
  };

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
                    finishEditingTitle();
                  }
                }}
              />
            ) : (
              <span>{orgName}</span>
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
              <Button
                className="flex justify-start flex-1 font-normal text-neutral-50 bg-neutral-800"
                onClick={() => {
                  navigator.clipboard.writeText(orgInfo.id.toString());
                  toast(`"${orgInfo.id}" Copied to clipboard`);
                }}
              >
                <CopyIcon />
                {orgInfo.id}
              </Button>
              <Button variant={"outline"} size={"icon"}>
                <RefreshCwIcon />
              </Button>
            </div>
          </div>
          <Label htmlFor="name" className="text-right">
            Members
          </Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Email</TableHead>
                <TableHead className="w-[100px]">Role</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="w-[100px]">{member.email}</TableCell>
                  <TableCell className="w-[100px]">
                    {member.id == orgInfo.owner ? "Owner" : "Member"}
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-row gap-2">
            {isOwner ? (
              <>
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:bg-red-700"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      Delete Org
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this organization?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleDeleteOrg();
                            setIsDeleteOpen(false);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsDeleteOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : null}
            <Button variant="destructive" onClick={() => handleLeaveOrg()}>
              Leave Org
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              isEditingTitle ? finishEditingTitle() : handleSaveOrg();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default OrgConfigModal;
