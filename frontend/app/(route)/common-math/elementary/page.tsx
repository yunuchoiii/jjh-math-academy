"use client";

import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import BoardSection from "@/app/_components/LandingSection/BoardSection";
import CurriculumSection from "@/app/_components/LandingSection/CurriculumSection";
import FeaturesSection from "@/app/_components/LandingSection/FeaturesSection";
import HeroSection from "@/app/_components/LandingSection/HeroSection";
import ImprovedGradesSection from "@/app/_components/LandingSection/ImprovedGradesSection";
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from "@/app/_constants/constants";
import { BoardSlugEnum } from "@/app/_service/board";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

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

const FeaturesTitle = () => {
  return (
    <>
      학생 개개인의 속도와 수준에 맞춘 <br className="block md:hidden" />
      <b>맞춤형 수업</b>을 진행합니다.
    </>
  );
};

const FeaturesSubtitle = () => {
  return (
    <>
      초등 수학은 <b>기초</b>를 다지는 시기로, <br className="block md:hidden" />
      끈기 있는 <b>문제 해결 능력</b>을 기르는 것이 중요합니다.
    </>
  );
};

const features = [
  {
    title: "기초부터 심화까지, 단계적 학습",
    description: "기본 개념을 충분히 이해하고, 사고력 문제 풀이를 통해 심화 문제 해결력을 기릅니다.",
  },
  {
    title: "소규모 과외식 지도",
    description: "부족한 부분을 보완하며, 성취감을 느낄 수 있도록 맞춤형 학습을 제공합니다.",
  },
  {
    title: "오답 분석과 클리닉",
    description: "오답을 분석하고, 부족한 개념을 다시 학습하여 학생의 취약점을 완벽히 보완합니다.",
  },
  {
    title: "연산 훈련과 사고력 수학 병행",
    description: "기본 연산 능력과 더불어 창의적 문제 해결 능력을 키웁니다.",
  },
  {
    title: "전국 단위 평가 대비",
    description: "TESOM과 같은 평가를 통해 학생의 현재 상태를 객관적으로 파악합니다.",
  },
  {
    title: "정기 피드백과 학부모 소통",
    description: "학생의 학습 상황을 주기적으로 점검하여 학부모님께 상세히 공유합니다.",
  },
];

const curriculums = [
  {
    grade: "초등학교 1학년",
    title: "수학의 첫걸음",
    description: "숫자와 기본 연산을 배우며 수학의 기초 개념을 형성하고, 계산의 즐거움을 경험합니다.",
    tags: ["숫자 세기", "덧셈과 뺄셈", "간단한 도형"],
  },
  {
    grade: "초등학교 2학년",
    title: "기초 연산 능력 강화",
    description: "세 자리 수의 연산과 곱셈·나눗셈의 기초를 다지며, 연산 속도와 정확성을 향상시킵니다.",
    tags: ["곱셈과 나눗셈", "길이와 시간", "규칙 찾기"],
  },
  {
    grade: "초등학교 3학년",
    title: "도형과 분수의 이해",
    description: "도형의 기본 성질을 익히고, 분수와 소수의 기초 개념을 학습하여 수학적 사고력을 키웁니다.",
    tags: ["분수와 소수", "평면 도형", "시간 계산"],
  },
  {
    grade: "초등학교 4학년",
    title: "복잡한 연산 해결력",
    description: "혼합 계산과 도형의 심화 학습을 통해 실생활 문제 해결 능력을 기릅니다.",
    tags: ["혼합 계산", "심화 분수와 소수", "복잡한 도형"],
  },
  {
    grade: "초등학교 5학년",
    title: "실생활 연계 수학",
    description: "비례와 비율을 배우며, 실생활에서 수학을 활용할 수 있는 방법을 학습합니다.",
    tags: ["비례와 비율", "입체 도형", "자료 정리"],
  },
  {
    grade: "초등학교 6학년",
    title: "중등 수학 준비",
    description: "중등 과정의 기초를 학습하며, 고등 수학의 기반이 되는 사고력을 기릅니다.",
    tags: ["정비례·반비례", "방정식 기초", "심화 도형"],
  },
];

const ElementaryMathPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  return <div 
    className="home-root flex flex-col items-center"
    style={{marginTop: `-${isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT + 120}px`}}
  >
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
    <FeaturesSection
      title={<FeaturesTitle />}
      subtitle={<FeaturesSubtitle />}
      features={features}
      backgroundColor="yellow"
    />
    <CurriculumSection
      title="초등 교과 수학 커리큘럼"
      curriculums={curriculums}
      color="yellow"
    />
    <BoardSection 
      title="초·중등 교과 수학 게시판" 
      titleColor="yellow"
      slug={BoardSlugEnum.COMMON_MATH} 
    />
  </div>;
};

export default ElementaryMathPage;