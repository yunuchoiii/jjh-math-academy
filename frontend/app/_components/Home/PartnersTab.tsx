"use client"

import { useState } from "react";
import styles from "./Layout.module.css";

export default function PartnersTab () {
  const tabs = [
    {
      title: 'partners',
      images: [
        'yorisu.png',
        'visang.png',
        'mathholic.png',
      ]
    },
    {
      title: 'books',
      images: [
        'mirae-n.png',
        'visang.png',
        'cheonjae.png',
        'didimdol.png',
        'donga.png',
        'sinsago.png',
        'neungryul.png',
      ]
    },
  ];

  return <div className="px-0 md:px-5 lg:px-0">
    {/* PC Version */}
    <div className="md:flex hidden justify-between mt-20">
      {tabs.map((tab,index) => <div key={`home-partners-${index}`} className={index==0 ? 'w-[28%]' : 'w-[68%]'}>
        <div className="w-full flex items-center">
          <div className="w-full h-[1px] bg-green-1"></div>
          <div className="px-2 uppercase text-sm Montserrat font-bold">{tab.title}</div>
          <div className="w-full h-[1px] bg-green-1"></div>
        </div>
        <div className="w-full flex items-center justify-between mt-5">
          {tab.images.map(i => <img src={`/images/icons/${i}`} alt="logo" className="xl:h-8 lg:h-6 md:h-5 grayscale" key={`partner-img-${i}`}></img>)}
        </div>
      </div>)}
    </div>
    {/* Mobile Version */}
    <div className="md:hidden block mt-10">
      {tabs.map((tab, idx) => {
        const [show, setShow] = useState<boolean>(false);
        const handleTab = () => {
          setShow(!show);
        }

        return <div key={`mobile-partner-tab=${idx}`} className={`mb-7 overflow-hidden relative ${show ? styles[`mo-partners-h-${idx+1}`] : 'h-4'} transition-all duration-300`}>
          <div className="flex items-center bg-lightgray-1 relative z-10" onClick={handleTab}>
            <div className="text-xs font-bold Montserrat uppercase">
              {tab.title}
            </div>
            <div className="flex-1 h-[1px] bg-green-1 mx-2.5"/>
            <img src="images/icons/arrow.png" alt="arrow" className={`w-2 mr-1 ${ show ? '-rotate-90' : 'rotate-90'}`}/>
          </div>         
          <div className={`flex flex-col items-center pt-2.5 absolute bottom-0 left-1/2 -translate-x-1/2`}>
            {tab.images.map((img, i) => <img src={`/images/icons/${img}`} alt="logo" className="max-h-[40px] max-w-[130px] grayscale my-4" key={`partner-img-${i}`}/>)}
          </div> 
        </div>
    })}
    </div>
  </div>
}