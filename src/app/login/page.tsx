import LoginButton from "../../components/LoginButton";
import SignOutButton from "../../components/SignOutButton";
import { getUser } from "../../lib/auth";

async function LoginPage() {
  const user = await getUser();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pb-24">
      {user ? <SignOutButton /> : <LoginButton />}
    </div>
  );
}

export default LoginPage;
