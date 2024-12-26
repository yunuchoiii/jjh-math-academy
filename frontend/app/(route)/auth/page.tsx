'use client'

import userState from "@/app/_stores/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Auth = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      router.push('/user');
    }
  }, [user]);

  return <></>
}

export default Auth;