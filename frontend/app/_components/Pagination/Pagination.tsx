"use client";

import { IPaginationInfo } from "@/app/_service/common";
import { usePathname, useRouter } from "next/navigation";

const getFirstPage = (page: number) => Math.floor((page - 1) / 5) * 5 + 1;

interface IPageButtonProps {
  page: number;
  isActive: boolean;
  type: "prev" | "next" | "page";
}

const PageButton = ({ page, isActive, type }: IPageButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const styles = {
    default: "bg-[#E9E9E9] text-[#777777] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.05)] hover:border-[#DDDDDD] disabled:hover:shadow-none disabled:hover:border-transparent",
    active: "bg-green-1 text-white shadow-[0px_4px_8px_0px_rgba(65,181,128,0.3)] border-green-1",
    disabled: "opacity-50 cursor-default"
  };

  const handleClick = () => {
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <button
      className={`w-10 h-10 rounded-xl NanumSquare font-extrabold border border-transparent transition-all duration-150 ${isActive ? styles.active : styles.default}`}
      onClick={handleClick}
    >
      {type === "prev" && <i className="fas fa-chevron-left mr-0.5"></i>}
      {type === "next" && <i className="fas fa-chevron-right ml-0.5"></i>}
      {type === "page" && <span className="leading-none">{page}</span>}
    </button>
  );
};

interface IPaginationProps {
  paginationInfo: IPaginationInfo;
}

const Pagination = ({ paginationInfo }: IPaginationProps) => {
  const currentPage = paginationInfo.requestPage;
  const firstPage = getFirstPage(currentPage);
  const pageList = Array.from({ length: 5 }, (_, i) => firstPage + i);

  return (
    <div className="flex gap-2 justify-center">
      <PageButton 
        page={
          // 현재 페이지가 1보다 작으면 1로 이동
          getFirstPage(currentPage - 5) < 1 
            ? 1 : getFirstPage(currentPage - 5)
        } 
        isActive={false} 
        type="prev" 
      />
      {pageList.map((page) => (
        page <= paginationInfo.totalPages && 
        <PageButton 
          key={page} 
          page={page} 
          isActive={currentPage === page} 
          type="page" 
        />
      ))}
      <PageButton 
        page={
          // 현재 페이지가 마지막 페이지보다 크면 마지막 페이지로 이동
          getFirstPage(currentPage + 5) > paginationInfo.totalPages
            ? paginationInfo.totalPages : getFirstPage(currentPage + 5)
        } 
        isActive={false} 
        type="next" 
      />
    </div>
  );
};

export default Pagination;