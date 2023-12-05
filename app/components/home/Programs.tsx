import Link from "next/link"
import styles from './Layout.module.css'

export default function Programs () {
  const programList = [
    {
      desc: '놀이로 배우는',
      title: '요리수',
      color: '#5C980F',
      iconPath: '/images/icons/yorisu-dice.png',
      iconBg: '#82BF33',
      logoPath: '/images/icons/yorisu.png',
      href: 'https://www.yorisu.co.kr/',
    },
    {
      desc: '풀이부터 분석까지',
      title: '수학플러스러닝',
      color: '#3E068B',
      iconPath: '/images/icons/mathpluslearning.png',
      iconBg: '#FFB902',
      logoPath: '/images/icons/visang.png',
      href: 'http://brand.soohakplus.com/',
    },
    {
      desc: '스마트러닝 맞춤수학',
      title: '매쓰프로',
      color: '#00A8AA',
      iconPath: '/images/icons/mathpro-tablet.png',
      iconBg: '#FDCFD9',
      logoPath: '/images/icons/mathpro.png',
      href: 'https://www.mathpro.co.kr/',
    },
  ]
  return <>
  {/* PC Version */}
    <div className="lg:flex hidden justify-evenly">
      {programList.map((program, index) => (
        <div key={`home-program-${index}`} className={`w-[23%] flex ${index != 1 ? 'flex-col' : 'flex-col-reverse'} items-center`}>
          <a href={program.href} target="_blank" className={`w-full flex flex-col items-center justify-center xl:h-[300px] lg:h-[267px] bg-white rounded-3xl NanumSquare border-2 border-solid border-transparent transition-all ${styles[`program-${index}`]}`}>
            <div className="xl:w-32 xl:h-32 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center mb-10" style={{backgroundColor: program.iconBg}}>
              <img src={program.iconPath} alt={program.title} className="xl:h-24 lg:h-20"/>
            </div>
            <span className="mb-2 xl:text-base lg:text-sm font-bold">
              {program.desc}
            </span>
            <span className="xl:text-2xl lg:text-xl font-extrabold" style={{color: program.color}}>
              {program.title}
            </span>
          </a>
          <div className={`w-[1px] xl:h-20 lg:h-16 ${styles[`program-${index}-bg`]}`}></div>
          <div className={`w-2 h-2 rounded-md ${styles[`program-${index}-bg`]}`}></div>
          <img src={program.logoPath} alt={program.title}
            className={`${index == 0 ? 'mt-5' : index == 1 ? 'mb-2' : 'mt-10'} xl:w-44 lg:w-36`}/>
        </div>
      ))}
    </div>
    {/* Mobile Version */}
    <div className="lg:hidden flex justify-center items-center flex-col">
        {programList.map((program, index) => (
          <div 
            key={`mobile-progrem-${index}`} 
            className={`w-[286px] flex items-center pb-10 last:pb-0 ${index===1 ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <img src={program.logoPath} alt={program.title} className={`w-20 ${index===1 ? 'ml-3' : 'mr-3'}`}/>
            <div className="w-1 h-1 rounded-md bg-yellow-2" />
            <div className="w-5 h-[1px] bg-yellow-2"/>
            <a 
              href={program.href}
              className="flex items-center w-[170px] h-[70px] p-2.5 rounded-2xl bg-white shodow-2"
            >
              <div 
                className="w-[50px] h-[50px] rounded-[10px] flex items-center justify-center mr-2.5" 
                style={{background: program.iconBg}}
              >
                <img src={program.iconPath} alt={program.title} className="h-9"/>
              </div>
              <div className="font-bold text-[9px]">
                <div>{program.desc}</div>
                <div className="text-[13px] mt-0.5" style={{color: program.color}}>
                  {program.title}
                </div>
              </div>
            </a>
          </div>
        ))}
    </div>
  </>
}