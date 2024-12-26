'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import userState from "../_stores/user";
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