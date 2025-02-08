"use client"

import ReactiveButton from "@/app/_components/Button/ReactiveButton";
import { LOGO_GREEN_SRC } from "@/app/_constants/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface JoinCompleteProps {
  searchParams: {
    username: string;
  }
}

const JoinComplete = ({ searchParams }: JoinCompleteProps) => {
  const router = useRouter();
  return (<div className="w-full h-[500px] relative rounded-[30px] overflow-hidden shadow-3">
    <div className="absolute z-0 lg:top-20 md:top-40 top-20 left-[20%] sm:left-1/4 md:left-[15%] lg:w-80 lg:h-80 w-64 h-64 rounded-full bg-yellow-1"></div>
    <div className="absolute z-0 lg:top-40 md:top-44 top-64 right-[20%] sm:right-1/4 md:right-[15%] lg:w-64 lg:h-64 w-52 h-52 rounded-full bg-gradient-to-br from-[#37CC87] to-[#32EB97]"></div>
    <div className="absolute w-full h-full z-10 backdrop-blur-[80px] sm:backdrop-blur-[120px] lg:backdrop-blur-[160px] flex flex-col sm:flex-row justify-center items-center gap-10 NanumSquare">
        <Image src={LOGO_GREEN_SRC} alt="logo" width={200} height={200} />
        <div>
          <div className="text-xl sm:text-2xl font-extrabold leading-normal">
            {searchParams.username}님 <br/>가입을 축하합니다.
          </div>
          <div className="text-base font-bold my-5">
            지금 바로 로그인하고 서비스를 이용해보세요!
          </div>
          <ReactiveButton
            props={{
              onClick: () => {router.push("/auth/login");}
            }}
          >
            <div className="text-base font-bold bg-green-1 text-white rounded-full px-5 py-2.5">
              로그인하러 가기
            </div>
          </ReactiveButton>
        </div>
      </div>
    </div>
  )
}

export default JoinComplete;