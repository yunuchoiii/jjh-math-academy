'use client';
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    naver: {
      maps: naver.maps.Map;
    };
  }
}

export default function NaverMap () {
  const mapElement = useRef(null);
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);

  useEffect(() => {
    // 네이버 맵스 스크립트 로드 확인
    if (window.naver && window.naver.maps) {
      setNaverMapsLoaded(true);
    } else {
      const intervalId = setInterval(() => {
        if (window.naver && window.naver.maps) {
          setNaverMapsLoaded(true);
          clearInterval(intervalId);
        }
      }, 100); // 100ms마다 체크

      // 클린업 함수
      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    // 지도 초기화
    if (mapElement.current && naverMapsLoaded) {
      const { naver } = window;
      const location = new naver.maps.LatLng(37.655391, 127.067501);
      const mapOptions = {
        center: location,
        zoom: 16,
        zoomControl: false,
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, [naverMapsLoaded]); // naverMapsLoaded가 변경될 때만 실행

  return <div ref={mapElement} className="w-full h-full"></div>
}