"use client";

import ReactiveButton from "@/app/_components/Button/ReactiveButton";
import Title from "@/app/_components/Title/Title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Join = () => {
  const router = useRouter();

  const [selectedUserType, setSelectedUserType] = useState<"parent" | "student" | null>(null);

  const userTypeMap = [
    {
      label: "학생",
      type: "student",
      img: "/images/icons/student.png",
      href: "/auth/join/form?userType=student",
      theme: "yellow"
    },
    {
      label: "학부모",
      type: "parent",
      img: "/images/icons/parent.png",
      href: "/auth/join/form?userType=parent",
      theme: "green"
    },
  ];

  return (
    <div className="flex flex-col w-fit mx-auto">
      <Title title="회원가입" subtitle="회원가입 유형을 선택해주세요." />
      <div className="flex gap-4 md:gap-12 sm:p-10 p-6 bg-green-4 bg-opacity-50 rounded-[30px]">
        {userTypeMap.map((userType) => (
          <div 
            key={userType.type}
            className={`
              group cursor-pointer relative flex flex-col justify-center items-center md:w-[250px] md:h-[250px] sm:w-[220px] sm:h-[220px] w-[130px] h-[160px] rounded-[30px] bg-white shadow-2 transition-all duration-300 overflow-hidden border-4 border-transparent
              ${selectedUserType === userType.type ? "border-green-1" : " border-white"}
            `} 
            onClick={() => setSelectedUserType(userType.type as "parent" | "student")}
          >
            <div className="md:w-[128px] md:h-[128px] sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] relative">
              <Image
                src={userType.img}
                alt={userType.label}
                fill
              />
            </div>
            <div className="sm:text-2xl text-xl font-extrabold NanumSquare mt-5">
              {userType.label}
            </div>
          </div>
        ))}
      </div>
      <ReactiveButton
        props={{
          className: "w-full bg-green-1 text-white rounded-[30px] h-[50px] text-lg font-bold mt-5",
          disabled: !selectedUserType,
          onClick: () => router.push(`/auth/join/form?userType=${selectedUserType}`)
        }}
      >
        다음
      </ReactiveButton>
    </div>
  );
}

export default Join;