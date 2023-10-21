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
export const MENU_INFO:Array<parentMenu> = [
  {
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
  {
    sort: 2,
    title: "커리큘럼",
    children: [
      {
        sort: 1,
        title: "초등 교과 수학",
        link: "/curriculum/elementary"
      },
      {
        sort: 2,
        title: "중등 교과 수학",
        link: "/curriculum/middle"
      },
    ]
  },
  {
    sort: 3,
    title: "프로그램",
    children: [
      {
        sort: 1,
        title: "요리수",
        link: "/program/yorisu"
      },
      {
        sort: 2,
        title: "시그마 클래스",
        link: "/program/sigma-class"
      },
    ]
  },
  {
    sort: 4,
    title: "상담 안내",
    link: "/contact"
  },
];
export const CONTACT_INFO:Array<childMenu> = [
  {
    sort: 1,
    title: "010-8955-8180",
    icon: "/images/icons/phonecall-black.png",
    link: "tel:010-8955-8180"
  },
  {
    sort: 2,
    title: "카카오톡 상담",
    icon: "/images/icons/kakaotalk-black.png",
    link: ""
  },
  {
    sort: 3,
    title: "네이버 블로그",
    icon: "/images/icons/blog-black.png",
    link: BLOG_LINK
  },
  {
    sort: 4,
    title: "네이버 지도",
    icon: "/images/icons/location-black.png",
    link: NAVER_MAP_LINK
  },
]