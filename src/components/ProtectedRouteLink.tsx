"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProtectedRouteLinkProps {
  href: string;
  children: React.ReactNode;
  user: any;
}

const ProtectedRouteLink: React.FC<ProtectedRouteLinkProps> = ({
  href,
  children,
  user,
}) => {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Must be Logged in!");
      return;
    }
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className="hover:text-emerald-600">
      {children}
    </a>
  );
};

export default ProtectedRouteLink;
