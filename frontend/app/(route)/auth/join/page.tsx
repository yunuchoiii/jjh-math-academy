"use client";

import ReactiveButton from "@/app/_components/Button/ReactiveButton";
import Title from "@/app/_components/Title/Title";
import Image from "next/image";
import Link from "next/link";

const Join = () => {
  const userTypeMap = [
    {
      label: "학생",
      type: "student",
      img: "/images/icons/student.png",
      href: "/auth/join/type?userType=student",
      theme: "yellow"
    },
    {
      label: "학부모",
      type: "parent",
      img: "/images/icons/parent.png",
      href: "/auth/join/type?userType=parent",
      theme: "green"
    },
  ];

  return (
    <div>
      <Title title="회원가입" subtitle="회원가입 유형을 선택해주세요." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {userTypeMap.map((userType) => (
          <ReactiveButton>
            <Link 
              href={userType.href}
              key={userType.type}
              className={`
                group cursor-pointer relative flex justify-end py-8 px-6 md:px-12 h-[200px] rounded-[30px] shadow-3 transition-all duration-300 backdrop-blur-[80px] overflow-hidden
                ${userType.theme === "yellow" ? 
                  "bg-yellow-4 hover:bg-yellow-1" : 
                  "bg-green-4 hover:bg-[#b1d499]"}
              `} 
            >
              <div className="absolute z-10 -bottom-8 left-6 md:left-10 w-32 h-32 lg:w-40 lg:h-40">
                <Image
                  src={userType.img}
                  alt={userType.label}
                  fill
                />
              </div>
              <div className="h-full flex flex-col items-end justify-between">
                <div className="hidden xl:block text-[60px] leading-none opacity-10 font-extrabold Montserrat uppercase">
                  {userType.type}
                </div>
                <div className="text-[38px] font-extrabold NanumSquare">
                  {userType.label}
                </div>
              </div>
            </Link>
          </ReactiveButton>
        ))}
      </div>
    </div>
  );
}

export default Join;