export const HEADER_HEIGHT = 60;
export const HEADER_HEIGHT_MOBILE = 50;
export const BLOG_LINK = "https://blog.naver.com/lllqueen8180";
export const NAVER_MAP_LINK = "https://m.place.naver.com/share?id=33510998&tabsPath=%2Fhome&appMode=detail";
export const CONTACT_SECTION_LINK = "/#contact-section";

// 네비게이션 바 데이터 정의
export type childMenu = {
  sort: number;
  title: string;
  link: string;
  icon?: string;
}

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