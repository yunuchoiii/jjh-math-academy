"use client";

import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import HeroSection from "@/app/_components/CommonMath/HeroSection";
import ImprovedGradesSection from "@/app/_components/CommonMath/ImprovedGradesSection";
import { useRouter } from "next/navigation";

const LeftSpeechBubbleText = () => {
  return <div className="font-bold">
    우리 아이가 아직 연산 속도가 느리고&nbsp;
    <br className="block lg:hidden" />
    개념 이해도 부족한데, 따라갈 수 있을까요?
  </div>
}

const RightSpeechBubbleText = () => {
  return <div className="font-bold">
    걱정하지 마세요!&nbsp;
    <br className="block sm:hidden" />
    아이의 속도와 수준에 맞는 맞춤형 학습을 제공합니다.&nbsp;
    <br className="block lg:hidden" />
    기초부터 차근차근 따라갈 수 있습니다!
  </div>
}

const speechBubbleText = {
  left: <LeftSpeechBubbleText />,
  right: <RightSpeechBubbleText />,
}

const improvedGradesList = [
  {
    id: 1,
    student: "상곡초 6학년 A양",
    description: <div>
      <span className="highlight-yellow"><b>‘레테 LOW’</b> 수준에서 <b>‘최상위 쎈’</b>까지 도달</span><br/>
      현재 중등 과정 선행 중<br/>
      <b>고등 대비 심화 학습까지 진행!</b>
    </div>,
  },
  {
    id: 2,
    student: "청원초 6학년 B군",
    description: <div>
      초등 3학년부터 꾸준히 학습<br/>
      <b>수탐대회 100점 및 경시대회 금상 수상</b><br/>
      <span className="highlight-yellow">심화 수학과 중등 수학 병행</span>하며 안정적인 성장 중!
    </div>,
  },
  {
    id: 3,
    student: "상계초 6학년 C군",
    description: <div>
      등록 <b>6개월</b> 만에 <b>초등 5학년 후행 학습 완성</b><br/>
      <b>초등 6학년 심화</b> 진도 완료<br/>
      <span className="highlight-yellow">고학년 사고력 수학과 중등 선행</span> 완료 예정!
    </div>,
  },
  {
    id: 4,
    student: "중계초 5학년 D양",
    description: <div>
      사고력과 연산이 약했던 학생,<br/>
      <b>학습 습관을 개선</b>하여 1년간 연산과 교과 과정을 병행<br/>
      <span className="highlight-yellow">현재 초등 6학년 <b>최상위 문제 풀이까지 가능!</b></span>
    </div>,
  },
  {
    id: 5,
    student: "상수초 3학년 E군",
    description: <div>
      연산이 느리고 개념 이해가 부족했던 학생,<br/>
      <span className="highlight-yellow">교구와 시각 자료</span>를 활용한 학습하여<br/>
      학기 중반에 <b>교과 연산 100문제 테스트에서 만점 기록!</b>
    </div>,
  },
];

const ElementaryMathPage = () => {
  const router = useRouter();
  const stickyButtons:StickyButtonProps[] = [
    {
      label: "초등 교과 수학",
      color: "yellow",
      isActive: true,
    },
    {
      label: "중등 교과 수학",
      onClick: () => router.push("/common-math/middle"),
      color: "green",
      isActive: false,
    },
  ];

  return <div className="home-root flex flex-col items-center -mt-[140px]">
    <StickyButtons buttons={stickyButtons} />
    <HeroSection
      title="초등 교과 수학"
      subtitle="기초부터 심화까지 재미있고 탄탄하게!"
      type="elementary"
    />
    <ImprovedGradesSection
      speechBubbleText={speechBubbleText}
      improvedGradesList={improvedGradesList}
    />
  </div>;
};

export default ElementaryMathPage;