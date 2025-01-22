"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../Toast/ToastProvider";

interface SearchBarProps {
  searchTypes: {value: string, label: string}[];
  onSearch?: () => void;
}

const SearchBar = ({ searchTypes, onSearch }: SearchBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { addToast } = useToast();

  const [searchTypeVisible, setSearchTypeVisible] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string | null>(null);

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setSearchTypeVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleSearchType = (type: string) => {
    setSearchType(type);
    setSearchTypeVisible(false);
  }

  const validateSearch = () => {
    if (!searchKeyword) {
      addToast({
        message: "검색어를 입력해주세요.",
        type: "error",
      });
      return false;
    }
    if (!searchType) {
      addToast({
        message: "검색 기준을 선택해주세요.",
        type: "error",
      });
      setSearchTypeVisible(true);
      return false;
    }
    return true;
  };

  const handleSearchButton = () => {
    if (onSearch) {
      onSearch();
    } else if (validateSearch()) {
      const queryParams = new URLSearchParams();
      queryParams.append("searchKeyword", searchKeyword!);
      queryParams.append("searchType", searchType!);
      router.push(`${pathname}?${queryParams.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터키로 인한 기본 동작 방지
      handleSearchButton();
    }
  }

  const fullSelectHeight = searchTypes.length * 40 + 10 + (searchTypes.length - 1);

  return <div ref={searchBarRef} className="flex justify-center w-full">
    <div className="flex items-center gap-2 w-full min-w-[300px]">
      <div className={`flex-1 group relative flex items-center gap-2.5 p-[5px] bg-[#efefef] border-2 border-[#efefef] rounded-full transition-all duration-150 focus-within:border-green-1 focus-within:bg-white`}>
        <div className="relative NanumSquare">
          <button
            className={`w-24 h-[30px] bg-green-1 text-sm text-white font-semibold rounded-full`}
            onClick={() => setSearchTypeVisible(!searchTypeVisible)}
          >
            {searchType ? searchTypes.find(type => type.value === searchType)?.label : "검색 기준"}
          </button>
          <div 
            className={`absolute w-24 top-11 left-0 right-0 bg-white rounded-[15px] overflow-hidden transition-all duration-300 shadow-[0_0_16px_rgba(0,0,0,0.15)]`}
            style={{
              height: searchTypeVisible ? `${fullSelectHeight}px` : "0px",
              padding: searchTypeVisible ? "5px 10px" : "0px 10px",
            }}
          >
            {searchTypes.map((type, index) => (
              <div className={`${searchTypeVisible ? "opacity-100" : "opacity-0"} transition-all duration-300 flex flex-col justify-center`}>
                <button 
                  key={type.value} 
                  onClick={() => handleSearchType(type.value)}
                  className={`h-10 flex items-center justify-center text-sm font-semibold md:hover:text-green-1 ${searchType === type.value ? "text-green-1" : "text-black"}`}
                >
                  {type.label}
                </button>
                {index !== searchTypes.length - 1 && 
                  <hr className="w-full h-[1px] text-[#DDD]"/>
                }
              </div>
            ))}
          </div>
        </div>
        <input 
          type="text" 
          placeholder="검색" 
          className="flex-1 outline-none bg-transparent w-0" 
          onChange={handleSearch} 
          onKeyDown={handleKeyDown} 
        />
      </div>
      <button 
        onClick={handleSearchButton}
        className={`w-11 h-11 flex-shrink-0 bg-green-1 text-sm text-white rounded-full`} 
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  </div>
} 

export default SearchBar;