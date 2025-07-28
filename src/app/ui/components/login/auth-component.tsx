'Use Client';
import { Button } from "@/app/ui/components/button"
//import { signIn } from "../../../../../auth.config"
import { serverSignOut, signInWithProvider } from "../../../../../auth.server"


export function SignIn({
  
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={signInWithProvider}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={serverSignOut}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0 bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20" {...props}>
        Sign Out
      </Button>
    </form>
  )
}