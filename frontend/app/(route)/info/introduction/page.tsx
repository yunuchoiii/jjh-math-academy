import BlockQuote from "@/app/_components/BlockQuote/BlockQuote";
import Title from "@/app/_components/Title/Title";
import Image from "next/image";

const SchoolList = ({type, schools}: {type: string, schools: string[]}) => {
  return <div className="p-3 sm:px-[20px] sm:py-[15px] rounded-[25px] sm:rounded-full bg-blue-5 flex flex-col sm:flex-row items-center gap-5 border border-blue-1 shadow-2">
    <div className="w-full sm:w-20 text-center bg-blue-2 text-white font-medium px-[10px] py-[5px] rounded-full">
      {type}
    </div>
    <div className="flex-1 text-blue-2 font-medium p-1 sm:p-0 break-keep text-center">
      {schools.join(', ')} 등
    </div>
  </div>
}

const IntroductionPage = () => {
  const currentYear = new Date().getFullYear();

  const features: {
    title: string;
    subtitle: string;
    description: string;
  }[] = [
    {
      title: "시그마 클래스",
      subtitle: "교과 기반 사고력 수학 프로그램",
      description:
        "<b>수학적 사고력</b>과 <b>문제 해결 능력</b>을 배양하기 위해 설계된 프로그램으로, 창의적인 접근 방식을 학습하며 <b>중·고등 심화 학습</b>까지 대비할 수 있습니다.",
    },
    {
      title: "요리수 연산 교실",
      subtitle: "게임으로 배우는 연산 교육",
      description:
        "<b>6세부터 초2 학생들을 대상으로</b> 재미있는 게임을 통해 <b>수학 연산의 기본기</b>를 탄탄히 다지며, 숫자와 친숙해질 수 있도록 돕습니다.",
    },
    {
      title: "체계적인 내신 관리",
      subtitle: "전문 프로그램을 통한",
      description:
        "<b>비상수학 플러스러닝 & 매쓰프로 시스템</b>을 통해 학생별 학습 패턴을 분석하고, <b>내신 대비</b>를 위한 최적의 교재와 학습 플랜을 제공합니다.",
    },
    {
      title: "맞춤형 수업",
      subtitle: "100% 개별 교재와 개별 진도",
      description:
        "<b>학생의 현재 수준과 학습 목표에 맞춰</b> 학습 계획을 유연하게 조정하며, <b>개인별로 최적화된 수업</b>을 진행합니다.",
    },
    {
      title: "오답 관리와 복습",
      subtitle: "학습 공백을 최소화",
      description:
        "<b>수업 중 해결하지 못한 문제</b>를 철저히 분석하고, <b>반복 학습</b>을 통해 학생 스스로 약점을 보완할 수 있도록 지도합니다.",
    },
    {
      title: "유연한 선행 및 심화 학습",
      subtitle: "학생의 수준과 목표에 맞춘",
      description:
        "<b>학년별로 필요한 개념</b>을 심화하거나 선행 학습을 진행하며, <b>학습 목표를 명확히 하고 중·고등 연계 학습</b>을 지원합니다.",
    },
  ];

  return <div>
    <section className="mb-20">
      <Title title="학원 소개" color="blue"/>
      <div className="flex flex-col md:flex-row gap-[50px]">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] bg-white rounded-full flex items-center justify-center shadow-3">
            <Image src="/images/logos/logo_darkgreen.png" alt="introduction-1" width={120} height={120} className="object-cover"/>
          </div>
          <div className="font-bold NanumSquare text-center mt-5 leading-relaxed">
            <span className="text-[#666]">작지만 강한 학원</span><br/>
            <span className="text-xl font-extrabold">조재현 수학학원</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2.5 justify-center py-2.5">
          <p className="text-lg leading-relaxed">
            조재현수학은 <strong>{currentYear - 2005}년 이상의 학원 운영 경력</strong>을 바탕으로 초중등 학생들에게 최상의 맞춤형 수학 교육을 제공합니다. <br/>
            단순히 수학 성적 향상만을 목표로 하지 않고, 아이들이 스스로 문제를 해결하며 <strong>깊이 있는 사고력</strong>을 키울 수 있도록 돕는 데 중점을 두고 있습니다.
          </p>
          <p className="text-lg leading-relaxed">
            유아교육과 출신의 원장 선생님이 초중등 최상위권 학생과 사립초 학생들을 전문적으로 지도하며, <br/>
            원장 선생님이 직접 지도함으로써 각 <strong>학생의 잠재력</strong>을 최대한 이끌어냅니다.
          </p>
          <p className="text-lg leading-relaxed">
            조재현 수학 학원 수업에서는 <strong>기본 개념을 확실히 다지는 것을 중요하게 생각</strong>하며, <br/>
            아이들의 현재 수준과 목표에 따라 <strong>선행 학습과 심화 학습을 유연하게 진행</strong>합니다.<br/>
            또한 학습 중 부족한 부분은 철저히 보완하고, 오답 관리를 통해 학습 공백을 최소화합니다. <br/>
            아이들이 2~3시간 이상 집중하며 <strong>스스로 문제를 해결할 수 있는 힘</strong>을 기를 수 있도록 돕는 것도 중요한 목표 중 하나입니다.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-20">
      <Title title="수업 특징" color="blue"/>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {features.map((feature, index) => (
          <div key={index} className="sm:h-[300px] rounded-[20px] shadow-2 p-[10px] flex flex-col border border-[#eee]">
            <div className="px-[20px] py-[15px] rounded-[15px] bg-blue-5">
              <div className="text-base text-[#555] font-bold NanumSquare mb-1">
                {feature.subtitle}
              </div>
              <div className="text-xl text-blue-2 font-extrabold NanumSquare">
                {feature.title}
              </div>
            </div>
            <div className="text-lg leading-relaxed px-[20px] flex-1 flex items-center pt-[10px]">
              <div dangerouslySetInnerHTML={{ __html: feature.description }} />
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-20 grid xl:grid-cols-2 gap-5 -mt-5">
      <Title title="대상 학교" color="blue"/>
      <SchoolList type="초등학교" schools={["청원초", "상명초", "화랑초", "을지초", "상수초", "중계초", "상곡초", "당현초"]} />
      <SchoolList type="중학교" schools={["신상중", "상계중", "중계중", "창동중", "온곡중"]} />
    </section>

    <section>
      <BlockQuote>
        수학은 <strong>시간 투자와 꾸준한 연습</strong>이 핵심입니다. <br/>
        아이들이 <strong>스스로 문제를 해결하며 성취감</strong>을 느끼고, 
        삶에서도 주체적으로 도전할 수 있는 힘을 키워주는 것이 제 교육의 목표입니다.
      </BlockQuote>
    </section>
  </div>
}

export default IntroductionPage;
