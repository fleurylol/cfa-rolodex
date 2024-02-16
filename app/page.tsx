import { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Hello not logged in user!</div>;
  return <div>Hello! {session?.user?.name}</div>;
}

export const metadata: Metadata = {
  title: "CFA Rolodex - Home",
  description: "Home page",
};
