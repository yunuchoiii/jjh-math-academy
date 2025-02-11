"use client";

import CircleLoader from "@/app/_components/Loader/CircleLoader";
import useUser from "@/app/_hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const {logout, isLoggedIn} = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoggedIn) {
      logout();
    } else {
      router.push("/");
    }
  }, [isLoggedIn]);

  return <div className="flex items-center justify-center py-[20vh]">
    <CircleLoader />
  </div>;
}

export default Logout;