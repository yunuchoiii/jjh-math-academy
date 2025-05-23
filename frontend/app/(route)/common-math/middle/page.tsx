import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import BoardSection from "@/app/_components/LandingSection/BoardSection";
import CurriculumSection from "@/app/_components/LandingSection/CurriculumSection";
import FeaturesSection from "@/app/_components/LandingSection/FeaturesSection";
import HeroSection from "@/app/_components/LandingSection/HeroSection";
import ImprovedGradesSection from "@/app/_components/LandingSection/ImprovedGradesSection";
import { BoardSlugEnum } from "@/app/_service/board";

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

const FeaturesTitle = () => {
  return <>
    수학은 단순한 과목이 아닌, <br className="block md:hidden" />
    <b>도전 정신</b>과 <b>문제 해결력</b>을 길러주는 과정입니다.
  </>
}

const FeaturesSubtitle = () => {
  return <>
    조재현 수학학원은 <b>끈기</b>와 <b>성실함</b>을 강조하며,<br className="block md:hidden" /> 
    학생들이 <b>성취감</b>을 느낄 수 있도록 지도합니다.
  </>
}

const features = [
  {
    title: "개별 맞춤 학습",
    description: "학생의 수준과 목표에 따라 개별 진도를 설정하고 부족한 부분을 보완합니다.",
    icon: "fas fa-user-friends",
  },
  {
    title: "오답 클리닉",
    description: "주기적인 테스트와 오답 분석으로 성취도를 점검하고 취약점을 보완합니다.",
    icon: "fas fa-clipboard-check",
  },
  {
    title: "과외식 집중 관리",
    description: "소그룹 수업으로 학생 개개인의 학습 상황을 세심히 관리합니다.",
    icon: "fas fa-chalkboard-teacher",
  },
  {
    title: "내신 대비 및 선행 학습",
    description: "철저한 내신 대비에서 더 나아가 고등 수학의 기초까지 준비합니다.",
    icon: "fas fa-calendar-check",
  },
  {
    title: "철저한 문제 풀이",
    description: "개념서, 연산서, 심화 문제집 등 다양한 자료를 활용해 완벽한 이해를 돕습니다.",
    icon: "fas fa-brain",
  },
  {
    title: "학교별 맞춤 자료 제공",
    description: "각 학교의 기출 문제와 족보를 분석해 학생이 필요로 하는 학습을 제공합니다.",
    icon: "fas fa-scroll",
  },
];

const curriculums = [
  {
    grade: "중등 1학년",
    title: "중등 수학 기초 확립",
    description: "중학교 수학의 기초 개념을 완벽히 이해하고 계산 실수를 줄이며, 수학에 대한 자신감을 형성합니다.",
    tags: ["정수와 유리수", "문자와 식", "기본 도형"],
  },
  {
    grade: "중등 2학년",
    title: "함수와 그래프 이해",
    description: "함수와 이차방정식 등 중학교 핵심 개념을 완벽히 이해하고 활용합니다.",
    tags: ["연립 방정식", "이차함수", "피타고라스 정리"],
  },
  {
    grade: "중등 3학년",
    title: "고등 수학 기초 다지기",
    description: "중학교 과정을 완벽히 마무리하고, 고등 수학 기초 개념에 대한 이해를 시작합니다.",
    tags: ["이차방정식", "삼각비", "확률과 통계"],
  },
];

const stickyButtons:StickyButtonProps[] = [
  {
    label: "초등 교과 수학",
    link: "/common-math/elementary",
    color: "yellow",
    isActive: false,
  },
  {
    label: "중등 교과 수학",
    color: "green",
    isActive: true,
  },
];

export const metadata = {
  title: "조재현 수학 - 중등 교과 수학",
  description: "내신과 고등 수학의 기초를 탄탄히!",
};

const MiddleMathPage = () => {
  return <div 
    className="home-root flex flex-col items-center -mt-[50px] md:-mt-[180px]"
  >
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
    <FeaturesSection
      title={<FeaturesTitle />}
      subtitle={<FeaturesSubtitle />}
      features={features}
      backgroundColor="green"
    />
    <CurriculumSection
      title="중등 교과 수학 커리큘럼"
      curriculums={curriculums}
      color="green"
    />
    <BoardSection 
      title="초·중등 교과 수학 게시판" 
      color="green"
      slug={BoardSlugEnum.COMMON_MATH} 
    />
  </div>;
};

export default MiddleMathPage;