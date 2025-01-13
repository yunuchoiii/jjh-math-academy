'use client'

import { IMathProgram } from "@/app/_service/info";
import Link from "next/link";
import styled from "styled-components";
import PlusIconButton from "../CustomButtons/PlusIconButton";

interface ClassInfoProps {
  classInfo: IMathProgram;
}

const Divider = () => (
  <div className="w-full h-[2px] bg-[#DEDEDE] mt-6 mb-6"></div>
)

const ClassInfo = ({classInfo}: ClassInfoProps) => {
  const borderColor = classInfo.theme_color.slice(0, -2) + "0.3)";
  const buttonHoverColor = classInfo.theme_color.slice(0, -2) + "0.15)";

  // 테마 색상 적용
  const Container = styled.div`
    & b {
      color: ${classInfo.theme_color};
    }
  `

  // 더 알아보기 버튼 호버 효과
  const MoreButton = styled.div`
    @media (min-width: 768px) {
      &:hover {
        background-color: ${buttonHoverColor};
      }
    }
  `

  return <Container
    className={`lg:col-span-4 sm:col-span-6 col-span-12 flex flex-col rounded-[30px] px-[30px] py-[40px] md:px-[40px] md:py-[50px] border-4 shadow-3 text-center`}
    style={{
      borderColor: borderColor,
    }}
  >
    <div className="font-bold NanumSquare">
      <div className="text-base mb-[10px]">
        {classInfo.subtitle}
      </div>
      <div className="text-xl font-extrabold" style={{color: classInfo.theme_color}}>
        {classInfo.title}
      </div>
    </div>
    <div className="mt-[30px] font-bold" style={{color: classInfo.theme_color}}>
      {classInfo.target_age}
    </div>
    <Divider />
    <div className="flex-1 flex items-center">
      <ul className="text-left pl-[20px]">
        {classInfo.description.map((description, index) => (
          <li key={index} className="text-base list-disc mb-2 last:mb-0">
            <Container dangerouslySetInnerHTML={{__html: description}}></Container>
          </li>
        ))}
      </ul>
    </div>
    <Divider />
    <div className="text-base sm:h-[120px] flex items-center justify-center">
      {classInfo.books}
    </div>
    <Divider />
    <div 
      dangerouslySetInnerHTML={{__html: classInfo.schedule.replaceAll('\n', '<br />')}} 
      className="sm:h-[100px] flex items-center justify-center"
    />
    <div className="flex items-center justify-center font-bold mt-10">
      <Link href={classInfo.url}>
        <MoreButton className={`flex items-center justify-center rounded-full p-2 pl-4 transition-all duration-150 `}>
          <span className="mr-[10px]">더 알아보기</span>
          <PlusIconButton color={classInfo.theme_color} size={30}/>
        </MoreButton>
      </Link>
    </div>
  </Container>
}

export default ClassInfo;
