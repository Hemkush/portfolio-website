"use server";
import { signOut, signIn} from "./auth.config";

export async function signInWithProvider(formData) {
  const provider = formData.get('provider')?.toString() || 'google';
  if (!provider) throw new Error('No provider specified')
  await signIn(provider)
}

export async function serverSignOut() {
  await signOut()
}