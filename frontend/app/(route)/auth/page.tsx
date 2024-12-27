'use client'

import useUser from "@/app/_hooks/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Auth = () => {
  const router = useRouter();
  const { user, accessToken } = useUser();

  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/login');
    } else {
      router.push('/user');
    }
  }, [accessToken]);

  return <>로그인</>
}

export default Auth;