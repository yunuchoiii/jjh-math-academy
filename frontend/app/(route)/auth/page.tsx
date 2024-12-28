'use client'

import useUser from "@/app/_hooks/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Auth = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        router.push('/user');
      } else {
        router.push('/auth/login');
      }
    }
  }, [isLoggedIn, isLoading]);

  return <>로그인</>
}

export default Auth;