'use client'

import LoginButton from "@/app/_components/Auth/LoginButton";
import Checkbox from "@/app/_components/Input/Checkbox";
import TextField from "@/app/_components/Input/TextField";
import { loginService } from "@/app/_service/login";
import userState from "@/app/_stores/user";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from "recoil";

const Login = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const callback = () => {
    router.push('/');
  }

  const errorCallback = (error: AxiosError) => {
    console.error(error);
    alert('로그인 실패');
  }

  const handleEmailLogin = async () => {
    if (rememberEmail) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    // 로그인 로직 추가
    try {
      const response = await loginService.login({data: {email, password}, callback, errorCallback});
      setUser(response.user);
    } catch (error) {
      console.error(error);
    }
  };

  const links = [
    { href: "/auth/join", label: "회원가입" },
    { href: "/auth/find", label: "아이디 · 비밀번호 찾기" }
  ];

  return (
    <div className="pt-8 md:pt-8 p-5 md:p-8 md:pl-0 rounded-[30px] bg-gradient-to-br from-10% from-green-3 to-yellow-1 mb-20 w-full md:flex items-center">
      <div className="w-full md:w-5/12 h-full flex items-center justify-center flex-col mb-8 md:mb-0">
        <img src="/images/logos/logo_white.png" alt="logo" className="w-1/3 md:w-1/2 min-w-[120px]"/>
        <div className="text-base font-bold NanumSquare leading-[1.2] mt-[35px]">
          완벽한 개념, 지독한 연습
        </div>
        <div className="text-3xl font-extrabold NanumSquare mt-[15px]">
          조재현 수학학원
        </div>
      </div>
      <div className="w-full md:w-7/12 px-5 md:px-[60px] py-[30px] rounded-[20px] bg-white bg-opacity-60 shadow-lg">
        <div className="text-[32px] sm:text-[42px] font-bold Montserrat leading-[1.2] tracking-tight text-center md:text-left mb-5 hidden md:block">
          Log In
        </div>
        <div>
          <TextField 
            label="Email" 
            placeholder="이메일을 입력해주세요." 
            inputType="email"
            value={email}
            onChange={setEmail}
          />
          <TextField 
            label="Password" 
            placeholder="비밀번호를 입력해주세요." 
            inputType="password"
            value={password}
            onChange={setPassword}
          />
          <Checkbox
            checked={rememberEmail}
            onChange={setRememberEmail}
            label="이메일 기억하기"
          />
        </div>
        <div className="mt-5">
          <LoginButton 
            label="이메일로 로그인" 
            icon="far fa-envelope"
            color="light"
            bgFrom="#37CC87"
            bgTo="#41B580"
            onClick={handleEmailLogin}
          />
          <LoginButton 
            label="카카오톡 로그인" 
            icon="fas fa-comment"
            color="dark"
            bgFrom="#FFDC61"
            bgTo="#EFC223"
          />
        </div>
        <div className="mt-5 flex justify-center items-center">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <Link href={link.href}>
                <button className="text-sm hover:text-green-2">{link.label}</button>
              </Link>
              {index < links.length - 1 && <span className="mx-2 text-xs">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;