"use client"

import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import HeroSection from "@/app/_components/CommonMath/HeroSection";
import ImprovedGradesSection from "@/app/_components/CommonMath/ImprovedGradesSection";
import { useRouter } from "next/navigation";

const LeftSpeechBubbleText = () => {
  return <div className="font-bold">
    아이가 이제 벌써 중학생인데 기초가 너무 부족해요.&nbsp;
    <br className="block lg:hidden" />
    혹시 너무 늦은건 아닐까요?
  </div>
}

const RightSpeechBubbleText = () => {
  return <div className="font-bold">
    걱정 마세요!&nbsp;
    <br className="block sm:hidden" />
    후행 학습으로 충분히 따라잡을 수 있습니다.&nbsp;
    <br className="block lg:hidden" />
    후행 학습은 현행, 선행 학습만큼 중요합니다!
  </div>
}

const speechBubbleText = {
  left: <LeftSpeechBubbleText />,
  right: <RightSpeechBubbleText />,
}

const improvedGradesList = [
  {
    id: 1,
    student: "신상중 2학년 A양",
    description: <div>
      여름방학에 찾아온 중1<br/>
      <span className="highlight-green">9개월만에 1학기 복습 + 현행 + 선행</span> 끝내고<br/>
      <b>2학년 첫 중간고사 100점!</b>
    </div>,
  },
  {
    id: 2,
    student: "상계중 2학년 B양",
    description: <div>
      학원 안 다녀 기초 없던 중1<br/>
      <span className="highlight-green">6개월만에 1년치 총복습 + 현행</span>하고<br/>
      <b>2학년 첫 중간고사 100점!</b>
    </div>,
  },
  {
    id: 3,
    student: "신상중 2학년 C군",
    description: <div>
      초등과정 하나도 모르던 중1<br/>
      <span className="highlight-green">기본부터 시작해 응용심화 마스터</span>하더니<br/>
      <b>2학년 첫 중간고사 95점!</b>
    </div>,
  },
  {
    id: 4,
    student: "신상중 3학년 D양",
    description: <div>
      초5 과정부터 다시 배우고 있는 중3<br/>
      <span className="highlight-green">3개월만에 몇년치 복습</span>하고<br/>
      <b>3학년 첫 중간고사 70점!</b>
    </div>,
  },
  {
    id: 5,
    student: "상계중 2학년 B양",
    description: <div>
      4개월 만에 45점 상승<br/>
      <span className="highlight-green">첫 중간고사에서 <b>93점</b> 달성</span><br/>
      <b>학교 내신 완벽 대비 + 상위권 진입 성공</b>
    </div>,
  },
];

const MiddleMathPage = () => {
  const router = useRouter();
  const stickyButtons:StickyButtonProps[] = [
    {
      label: "초등 교과 수학",
      onClick: () => router.push("/common-math/elementary"),
      color: "yellow",
      isActive: false,
    },
    {
      label: "중등 교과 수학",
      color: "green",
      isActive: true,
    },
  ];

  return <div className="home-root flex flex-col items-center -mt-[140px]">
    <StickyButtons buttons={stickyButtons} />
    <HeroSection
      title="중등 교과 수학"
      subtitle="내신과 고등 수학의 기초를 탄탄히!"
      type="middle"
    />
    <ImprovedGradesSection
      speechBubbleText={speechBubbleText}
      improvedGradesList={improvedGradesList}
    />
  </div>;
};

export default MiddleMathPage;