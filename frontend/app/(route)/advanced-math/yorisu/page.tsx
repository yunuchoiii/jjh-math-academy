import StickyButtons, { StickyButtonProps } from "@/app/_components/Button/StickyButtons";
import BoardSection from "@/app/_components/LandingSection/BoardSection";
import BooksAndToolsSection from "@/app/_components/LandingSection/BooksAndToolsSection";
import CurriculumSection from "@/app/_components/LandingSection/CurriculumSection";
import FeaturesSection from "@/app/_components/LandingSection/FeaturesSection";
import HeroSection from "@/app/_components/LandingSection/HeroSection";
import ReactionBubbles from "@/app/_components/LandingSection/ReactionBubbles";
import { BoardSlugEnum } from "@/app/_service/board";

const features = [
  {
    title: "기본부터 탄탄하게!",
    description:
      "단순 연산 반복이 아닌, 교구와 스토리텔링을 활용해 개념부터 이해하며 연산 능력을 자연스럽게 키웁니다.",
    icon: "fas fa-shapes",
  },
  {
    title: "수 감각과 수 체계 형성",
    description:
      "단순 계산이 아닌, 수의 개념을 체계적으로 쌓아가며 초등 전 학년 연산 학습의 기초를 다집니다.",
    icon: "fas fa-shoe-prints",
  },
  {
    title: "수학적 사고력 발달",
    description:
      "다양한 교구를 활용하여 아이들이 직접 만지고 경험하며 자연스럽게 연산 논리를 익힙니다.",
    icon: "fas fa-brain",
  },
  {
    title: "교과 연계 맞춤형 수업",
    description:
      "교과 과정과 철저히 연계된 커리큘럼을 통해 초등 수학에서 중요한 개념과 연산을 체계적으로 정리합니다.",
    icon: "fas fa-school",
  },
];

const curriculums = [
  {
    grade: "6~7세",
    title: "수학 첫걸음",
    description:
      "교구를 활용해 수 감각을 형성하고, 숫자와 수의 크기를 비교하며 연산의 기초를 다집니다.",
    tags: ["수 감각", "숫자 익히기", "수 비교", "놀이 학습"],
  },
  {
    grade: "초등 1학년",
    title: "기초 연산과 수의 관계",
    description:
      "덧셈과 뺄셈의 개념을 이해하고, 다양한 방법으로 계산하는 능력을 키웁니다. 수 감각과 연산 실력을 동시에 향상시킵니다.",
    tags: ["덧셈과 뺄셈", "수 감각 강화", "연산 논리"],
  },
  {
    grade: "초등 2학년",
    title: "다양한 연산 해결",
    description:
      "여러 가지 계산 방법을 익히며, 수의 관계를 활용한 연산 학습을 진행합니다. 연산의 원리를 깊이 이해하고 실전에 적용하는 능력을 기릅니다.",
    tags: ["교과 연산", "다양한 계산법", "사고력 연산", "문제 해결력"],
  },
];

const reactionBubbles = [
  <p>
    아이가 연산을 정말 즐거워합니다!<br/>
    교구와 게임을 활용해 <b>수학이 즐거워지는</b> 요리수 연산 교실!
  </p>,
  <p>
    단순 암기가 아닌 <b>수 감각과 사고력</b>을 함께 키우는 연산 수업,<br/>
    우리 아이가 <b>스스로 생각하며 계산하는 힘</b>을 기를 수 있어요!
  </p>,
  <p>
    연산이 어렵고 지루했던 아이들도 <b>게임처럼 배우며</b> 흥미를 느껴요.<br/>
    직접 만지고 움직이며 개념을 익히는 학습 방식이 정말 좋습니다.
  </p>,
  <p>
    <b>교과 과정과 연계된 체계적인 연산 학습</b> 덕분에<br/>
    학교 수업을 훨씬 더 쉽게 이해하고 따라갈 수 있어요!
  </p>,
];

const stickyButtons: StickyButtonProps[] = [
  {
    label: "요리수 연산 교실",
    color: "yellow",
    isActive: true,
  },
  {
    label: "시그마 클래스",
    link: "/advanced-math/sigma-class",
    color: "green",
    isActive: false,
  },
];

export const metadata = {
  title: "조재현 수학 - 요리수 연산 교실",
  description: "교구와 함께하는 재미있는 연산 학습!",
};

const YorisuPage = () => {
  return (
    <div className="home-root flex flex-col items-center -mt-[50px] md:-mt-[180px]">
      <StickyButtons buttons={stickyButtons} />
      <HeroSection
        title="요리수 연산 교실"
        subtitle="교구와 함께하는 재미있는 연산 학습!"
        type="yorisu"
      />
      <FeaturesSection
        title={
          <div>
            수 감각과 연산 실력을 동시에! <br className="block md:hidden" />
            <b>게임처럼 배우는 연산 교실</b>
          </div>
        }
        subtitle={
          <div className="leading-relaxed">
            단순 반복 학습이 아닌, <br className="block sm:hidden" />
            <b>이해하고 사고하는 연산 학습</b>으로 실력을 키웁니다. <br className="block" />
            교구와 게임을 활용해 <b>연산을 쉽고 재미있게!</b>
          </div>
        }
        features={features}
        backgroundColor="yellow"
      />
      <CurriculumSection
        title="요리수 연산 커리큘럼"
        curriculums={curriculums}
        color="yellow"
      />
      <BooksAndToolsSection
        title="요리수 연산 교실"
        color="yellow"
        books={["수 감각 교재", "연산 교재", "교과 연산 학습서"]}
        tools={["탱그램", "칠교", "수백판", "수카드"]}
        featuresOfBooks={["체계적인 연산 학습을 위한 맞춤형 교재를 제공합니다."]}
        featuresOfTools={["다양한 교구를 활용해 수 감각과 연산 능력을 재미있게 기릅니다."]}
      />
      <ReactionBubbles
        title="요리수 연산 교실"
        color="yellow"
        reactions={reactionBubbles}
        teacherWords={
          <>
            <b>교과 연계 연산 학습과 사고력</b>을 동시에!<br/>
            아이들이 스스로 <b>재미있게 배우는 요리수 연산 교실</b>을 만나보세요.
          </>
        }
      />
      <BoardSection
        title="요리수 연산 교실"
        color="yellow"
        slug={BoardSlugEnum.YORISU}
      />
    </div>
  );
};

export default YorisuPage;