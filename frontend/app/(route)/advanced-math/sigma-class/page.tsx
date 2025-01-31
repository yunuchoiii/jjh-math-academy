"use client";

import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import BoardSection from "@/app/_components/LandingSection/BoardSection";
import BooksAndToolsSection from "@/app/_components/LandingSection/BooksAndToolsSection";
import CurriculumSection from "@/app/_components/LandingSection/CurriculumSection";
import FeaturesSection from "@/app/_components/LandingSection/FeaturesSection";
import HeroSection from "@/app/_components/LandingSection/HeroSection";
import ReactionBubbles from "@/app/_components/LandingSection/ReactionBubbles";
import { BoardSlugEnum } from "@/app/_service/board";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

const features = [
  {
    title: "교과 수학 + 사고력 수학",
    description:
      "사고력 수학과 교과 심화를 유기적으로 연계하여 학습하여 고학년이 되어도 사고력을 지속적으로 키울 수 있도록 지도합니다.",
  },
  {
    title: "학생 맞춤형 커리큘럼",
    description:
      "학생마다 수준과 학습 속도가 다르기에, 개별 맞춤형 교재와 교구를 활용하여 스스로 생각하고 해결할 수 있는 힘을 길러줍니다.",
  },
  {
    title: "놓치지 않는 심화 수학",
    description:
      "영재원과 경시대회를 대비하는 심화 교재를 활용해, 중·고등학교 상위권까지 이어지는 탄탄한 사고력과 교과 학습을 구축합니다.",
  },
  {
    title: "재미있는 교구 활용",
    description:
      "탱그램, 칠교, 전략 보드게임 등 다양한 수학교구를 활용한 즐거운 수업 방식으로 사고력을 키우고 문제 해결력을 높입니다.",
  },
];

const curriculums = [
  {
    "grade": "초등 1학년",
    "title": "창의적 수학 탐험",
    "description": "탱그램, 칠교 등 다양한 교구를 활용해 수 개념과 기초 연산을 익히며 수학적 사고력을 키웁니다.",
    "tags": ["탱그램", "칠교", "기초 연산", "수 개념"]
  },
  {
    "grade": "초등 2학년",
    "title": "사고력과 연산의 조화",
    "description": "수 감각을 키우고 연산 능력을 높이는 동시에, 문제 해결력과 논리적 사고를 기릅니다.",
    "tags": ["수 감각", "문제 해결력", "논리적 사고", "연산 강화"]
  },
  {
    "grade": "초등 3학년",
    "title": "교과 심화와 사고력 확장",
    "description": "교과 심화 학습을 바탕으로 다양한 사고력 문제를 해결하며, 도형과 패턴을 분석하는 능력을 키웁니다.",
    "tags": ["교과 심화", "도형 분석", "패턴 탐색", "사고력 문제 해결"]
  },
  {
    "grade": "초등 4학년",
    "title": "문제 해결 중심 학습",
    "description": "다양한 전략적 사고 게임과 심화 문제를 통해 논리력과 창의력을 동시에 강화합니다.",
    "tags": ["전략적 사고", "심화 문제", "논리력", "창의적 해결"]
  },
  {
    "grade": "초등 5학년",
    "title": "고학년 심화 사고력",
    "description": "고급 수학적 사고를 훈련하고, 수학 경시대회 및 영재원 대비 문제를 통해 실력을 한 단계 업그레이드합니다.",
    "tags": ["고급 사고력", "수학 경시", "영재원 대비", "수학적 논리"]
  },
  {
    "grade": "초등 6학년",
    "title": "중학 연계 심화 학습",
    "description": "중학 과정의 개념을 선행하며, 심화 문제를 통해 논리적 사고와 문제 해결 능력을 극대화합니다.",
    "tags": ["중학 과정 선행", "논리적 사고", "심화 문제 해결", "수학적 사고력"]
  }
]

const reactionBubbles = [
  <p>
    아이들이 주도적으로 참여하고 싶어 하는 <b>재미있는 수학 수업!</b><br/>
    <b>흥미와 성취감</b>을 동시에 잡아줍니다.
  </p>,
  <p>
    <b>사고력 수학과 교과 수학</b>을 효과적으로 병행할 수 있어 학습 균형이 잘 맞고, 만족도가 높습니다.
  </p>,
  <p>
    우리 아이의 수준과 학습 속도에 딱 맞춘 <b>개인 맞춤형 커리큘럼</b> 덕분에 부담 없이 실력을 키울 수 있어요.
  </p>,
  <p>
    <b>다양한 교재와 교구</b>를 활용한 수업이 정말 효과적이에요.<br/>
    아이가 스스로 개념을 이해하고 성취감을 느낄 수 있습니다!
  </p>,
]

const SigmaClassPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const stickyButtons:StickyButtonProps[] = [
    {
      label: "요리수 연산 교실",
      onClick: () => router.push("/advanced-math/yorisu"),
      color: "yellow",
      isActive: false,
    },
    {
      label: "시그마 클래스",
      color: "green",
      isActive: true,
    },
  ];

  return <div 
    className="home-root flex flex-col items-center -mt-[50px] md:-mt-[180px]"
  >
    <StickyButtons buttons={stickyButtons} />
    <HeroSection
      title="시그마 클래스"  
      subtitle="사고력과 교과를 한번에!"
      type="sigma"
    />
    <FeaturesSection 
      title={<div>
        교과와 사고력을 함께 키우는 <br className="block md:hidden" />
        <b>맞춤형 수학 학습</b>
      </div>}
      subtitle={<div className="leading-relaxed">
        단순한 문제 풀이가 아닌, <br className="block sm:hidden" />
        <b>스스로 생각하고 해결하는 힘</b>을 길러줍니다. <br className="block" />
        시그마클래스에서 <b>교과와 사고력 수학을 <br className="block sm:hidden" />완벽하게 병행</b>하세요!
      </div>}
      features={features} 
      backgroundColor="green"
    />
    <CurriculumSection
      title="시그마 클래스 커리큘럼"
      curriculums={curriculums}
      color="green"
    />
    <BooksAndToolsSection
      title="시그마 클래스"
      color="green"
      books={["필즈", "팡세", "플라토", "팩토", "TOP사고력"]}
      tools={["탱그램", "칠교", "전략 보드게임"]}
      featuresOfBooks={["최신 사고력 교재와 학생별 맞춤형 교재를 조합하여 최적의 학습을 제공합니다."]}
      featuresOfTools={["다양한 교구를 통해 창의력, 집중력, 공간 지각 능력을 자연스럽게 키워나갑니다."]}
    />
    <ReactionBubbles
      title="시그마 클래스"
      color="green"
      reactions={reactionBubbles}
      teacherWords={<>즐거운 수업 방식으로 <b>사고력 수학과 교과 수학</b> 두마리 토끼를 잡는 <b>시그마 클래스!</b></>}
    />
    <BoardSection
      title="시그마 클래스"
      titleColor="green"
      slug={BoardSlugEnum.SIGMA_CLASS}
    />
  </div>;
};

export default SigmaClassPage;