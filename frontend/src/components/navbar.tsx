import { useSession } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/client";
import { InfoIcon, LogOut, User } from "lucide-react";

function Navbar() {
  const { session } = useSession();

  return (
    <>
      {session && (
        <nav className="flex max-w-screen-2xl mx-auto py-4 px-10 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><User /></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <InfoIcon />
                <span>Help</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      )}
    </>
  );
}

export default Navbar;