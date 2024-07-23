import { getUser } from "../lib/auth";
import Link from "next/link";
import ProtectedRouteLink from "./ProtectedRouteLink";

async function Header() {
  const user = await getUser();

  return (
    <header className="bg-zinc-900 h-16 flex items-center w-full absolute justify-center">
      <nav className="flex gap-8 items-center">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <ProtectedRouteLink href="/protected-route" user={user}>
          Protected Route
        </ProtectedRouteLink>
        <Link href="/login" className="hover:text-emerald-600">
          Login
        </Link>
      </nav>

      <div className="absolute right-4">
        {user ? `Welcome ${user.user_metadata.full_name}` : ""}
      </div>
    </header>
  );
}

export default Header;
