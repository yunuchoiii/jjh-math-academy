import type { IMathProgram, ITuition } from "../_service/info";

// NOTE:
// - 이 상수는 현재 프론트엔드에서만 사용되는 수업(프로그램) 정의입니다.
// - 백엔드 연동 전까지는 infoService.getPrograms 가 이 상수를 그대로 사용합니다.
// - id 값과 category, url 구조는 고정 값이므로 추후 DB 시드 시 참고하면 됩니다.

export const MATH_CLASSES: IMathProgram[] = [
  // ===== 교과 수학 =====
  {
    id: 1,
    category: "common_math",
    subtitle: "초등 수학으로 대입까지",
    title: "초등 교과 수학반",
    targetAge: "초 1-6",
    description: [
      "개인 수준별 교재 컨설팅 + 매쓰프프 + 비상 수플러스 시스템으로 확실히 잡는 교과수학",
      "상위권 5-6학년의 경우 <b>수능으로 가는 초등 고학년 수학</b> 진행",
    ],
    books:
      "쎈, 최상위수학, 수준별 수, 디딤돌, 개념유형플러스, 응용연산, 동화교재(플라톤/씨앗스), 오리연산, 문해결, 자이스토리 등",
    schedule: "초1-3: 주 3회 80~90분\n초4-6: 주 4-5회 120분",
    themeColor: "rgba(76, 126, 130, 1)",
    url: "/common-math/elementary",
  },
  {
    id: 2,
    category: "common_math",
    subtitle: "대입으로 가는 중등 내신반",
    title: "중등 교과 수학반",
    targetAge: "중 1-3",
    description: [
      "개인 수준별 교재 컨설팅 + 매쓰프프 + 비상 수플러스 시스템으로 철저한 내신관리",
      "1:1 개별진도로 후행학습/선행학습 등 원하는 커리큘럼으로 진행 가능",
      "연산력과 사고력을 함께 키우는 교과 연계 수학",
    ],
    books:
      "연산력수(단계별), 도형연습체험수학, 개념플러스(라이트/파워), 쎈, 자이스토리, 최상위수학, 고쟁이, 일등수학 등",
    schedule: "주 3-5회 120분+α",
    themeColor: "rgba(94, 109, 122, 1)",
    url: "/common-math/middle",
  },

  // ===== 심화 수학 =====
  {
    id: 3,
    category: "advanced_math",
    subtitle: "게임으로 배우는 연산",
    title: "요리수 연산 교실",
    targetAge: "6세~초2",
    description: [
      "개별교구+수학카드+보드게임과 전문 교재들을 결합해 재미있게 배우는 초등연산",
      "교과과정까지 모두 포함하는 연산 프로그램",
    ],
    books: "요리수 전문 교재, 교구",
    schedule: "주 1회 60분\n(교과 40분+자리 20분)\n주 1회 요리수 + 주 1회 사고력 BEST",
    themeColor: "rgba(217, 171, 11, 1)",
    url: "/advanced-math/yorisu",
  },
  {
    id: 4,
    category: "advanced_math",
    subtitle: "교과 연계 사고력 수학",
    title: "시그마 클래스",
    targetAge: "6세~초5",
    description: [
      "교과와 확실히 연계되는 사고력 수학",
      "필즈부터 경시까지 사고력수학 전문교재로 단계별 학습",
      "상위권의 경우, 교과수학반과 병행 시 시너지 BEST",
    ],
    books: "소마, 팩토, 와이즈만, 시매쓰, 씨투엠 플라토/평세, 필즈 등",
    schedule: "주 1회 120분",
    themeColor: "rgba(68, 140, 107, 1)",
    url: "/advanced-math/sigma-class",
  },
];

// NOTE:
// - 수업료 정보도 백엔드 연동 전까지는 상수를 사용합니다.
// - level / classLevel / monthlyFee 구조는 기존 API 스펙을 그대로 따릅니다.

export const TUITIONS: ITuition[] = [
  {
    id: 1,
    level: "elementary",
    classLevel: "초등 1-3",
    subject: "교과 수학",
    monthlyHours: "90분 × 주 3회",
    monthlyFee: 210000,
  },
  {
    id: 2,
    level: "elementary",
    classLevel: "초등 4-5",
    subject: "교과 수학",
    monthlyHours: "120분 × 주 4회",
    monthlyFee: 230000,
  },
  {
    id: 3,
    level: "elementary",
    classLevel: "초등 6",
    subject: "교과 수학",
    monthlyHours: "120분 × 주 5회",
    monthlyFee: 250000,
  },
  {
    id: 4,
    level: "middle",
    classLevel: "중등 1-2",
    subject: "교과 수학",
    monthlyHours: "120분 × 주 3~5회",
    monthlyFee: 300000,
  },
  {
    id: 5,
    level: "middle",
    classLevel: "중등 3",
    subject: "교과 수학",
    monthlyHours: "120분 × 주 3~5회",
    monthlyFee: 350000,
  },
  {
    id: 6,
    level: "high",
    classLevel: "고등 1-2",
    subject: "교과 수학",
    monthlyHours: "180분 × 주 3회",
    monthlyFee: 430000,
  },
];

