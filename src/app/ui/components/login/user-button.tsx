
import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/components/avatar"
import { Button } from "@/app/ui/components/button"
import { auth } from "../../../../../auth.config"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/ui/components/dropdown-menu"
import { SignIn, SignOut } from "./auth-component"

// const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>
// );

export default async function UserButton() {
  const session = await auth()

  if (!session?.user) return <SignIn />
  return (
    <div className="flex gap-2 items-center border border-gray-200 rounded-full px-4 h-10">

      <span className="hidden text-sm sm:inline-flex">
        {session.user.email}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8">
              {session.user.image && (
                <AvatarImage
                  src={
                    session.user.image ??
                    "https://source.boringavatars.com/beam/120"
                  }
                  alt={session.user.name ?? ""}
                />
              )}
              <AvatarFallback>{session.user.email}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-65 bg-white" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

  )
}