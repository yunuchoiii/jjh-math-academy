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


const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>`
  & b {
    color: ${(props) => props.themeColor};
  }
`;

const MoreButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "buttonHoverColor",
})<{ buttonHoverColor: string }>`
  @media (min-width: 768px) {
    &:hover {
      background-color: ${(props) => props.buttonHoverColor};
    }
  }
`;

const ClassInfo = ({classInfo}: ClassInfoProps) => {
  const borderColor = classInfo.themeColor.slice(0, -2) + "0.3)";
  const buttonHoverColor = classInfo.themeColor.slice(0, -2) + "0.15)";

  return <article
    className={`lg:col-span-4 sm:col-span-6 col-span-12 flex flex-col rounded-[30px] px-[30px] py-[40px] md:px-[40px] md:py-[50px] border-4 shadow-3 text-center`}
    style={{
      borderColor: borderColor,
    }}
  >
    <header className="font-bold NanumSquare">
      <h2 className="text-base mb-[10px]">
        {classInfo.subtitle}
      </h2>
      <h1 className="text-xl font-extrabold" style={{color: classInfo.themeColor}}>
        {classInfo.title}
      </h1>
    </header>
    <main className="flex-1 flex flex-col">
      <div className="mt-[30px] font-bold" style={{color: classInfo.themeColor}}>
        {classInfo.targetAge}
      </div>
      <Divider />
      <div className="flex-1 flex items-center">
        <ul className="text-left pl-[20px]">
          {classInfo.description.map((description, index) => (
            <li key={index} className="text-base list-disc mb-2 last:mb-0">
              <Container themeColor={classInfo.themeColor} dangerouslySetInnerHTML={{__html: description}}></Container>
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
    </main>
    <footer className="flex items-center justify-center font-bold mt-10">
      <Link href={classInfo.url}>
        <MoreButton
          buttonHoverColor={buttonHoverColor}
          className={`flex items-center justify-center rounded-full p-2 pl-4 transition-all duration-150 `}
        >
          <span className="mr-[10px]">더 알아보기</span>
          <PlusIconButton color={classInfo.themeColor} size={30} />
        </MoreButton>
      </Link>
    </footer>
  </article>
}

export default ClassInfo;
