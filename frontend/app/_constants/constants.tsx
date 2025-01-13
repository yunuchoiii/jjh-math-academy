export const HEADER_HEIGHT = 70;
export const HEADER_HEIGHT_MOBILE = 50;
export const BLOG_LINK = "https://blog.naver.com/lllqueen8180";
export const NAVER_MAP_LINK = "https://m.place.naver.com/share?id=33510998&tabsPath=%2Fhome&appMode=detail";

// 네비게이션 바 데이터 정의
export type childMenu = {
  sort: number;
  title: string;
  link: string;
  icon?: string;
}
export type parentMenu = {
  sort: number;
  title: string;
  link?: string;
  children?: Array<childMenu>
}
export const MENU_INFO:Record<string, parentMenu> = {
  info: {
    sort: 1,
    title: "소개",
    children: [
      {
        sort: 1,
        title: "선생님 소개",
        link: "/info/teacher"
      },
      {
        sort: 2,
        title: "수업시간 및 수업료",
        link: "/info/class"
      },
      {
        sort: 3,
        title: "오시는 길",
        link: "/info/location"
      },
    ]
  },
  common_math: {
    sort: 2,
    title: "교과 수학",
    children: [
      {
        sort: 1,
        title: "초등 교과 수학",
        link: "/common-math/elementary"
      },
      {
        sort: 2,
        title: "중등 교과 수학",
        link: "/common-math/middle"
      },
    ]
  },
  advanced_math: {
    sort: 3,
    title: "심화 수학",
    children: [
      {
        sort: 1,
        title: "요리수",
        link: "/advanced-math/yorisu"
      },
      {
        sort: 2,
        title: "시그마 클래스",
        link: "/advanced-math/sigma-class"
      },
    ]
  },
  contact: {
    sort: 4,
    title: "상담 안내",
    link: "/#contact-section"
  },
};
export const CONTACT_INFO:Record<string, childMenu> = {
  phone: {
    sort: 1,
    title: "010-8955-8180",
    icon: "/images/icons/phonecall-black.png",
    link: "tel:010-8955-8180"
  },
  kakaotalk: {
    sort: 2,
    title: "카카오톡 상담",
    icon: "/images/icons/kakaotalk-black.png",
    link: ""
  },
  blog: {
    sort: 3,
    title: "네이버 블로그",
    icon: "/images/icons/blog-black.png",
    link: BLOG_LINK
  },
  map: {
    sort: 4,
    title: "마이 페이지",
    icon: "/images/icons/user-black.png",
    link: "/user/mypage"
  },
}