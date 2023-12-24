import Link from 'next/link'
import styles from './Layout.module.css'

export default function SpecialClasses () {
  const classes = [
    {
      title: '요리수교과연산',
      desc: '<b>교구</b> 및 <b>전문 연산법</b>을 통해<br/>사고력·창의력을 키우며<br/>교과연산을 마스터하는',
      titleColor: '#D0A91E',
      pointColor: '#FFDC61',
      bgColor: '#FFF6D4',
      age: '6세 - 초2',
      logoPath: '/images/icons/yorisu.png',
      href: '/program/yorisu'
    },
    {
      title: '시그마클래스',
      desc: '<b>교과 심화</b>와 <b>사고력 수학</b>을 결합해<br/>입시 상위권을 위한 심화사고력을 기르는',
      titleColor: '#448C6B',
      pointColor: '#A6DA7D',
      bgColor: '#ECF6E4',
      age: '6세 - 초5',
      logoPath: '/images/icons/sigma-class.png',
      href: '/program/sigma-class'
    },
  ]
  return <>
    <div className="flex md:flex-col flex-col-reverse relative md:w-auto md:px-0 px-7 md:-mb-0 -mb-[337px]">
      <div className="flex justify-center items-center md:flex-row flex-col relative top-[-316px] md:top-0">
        {classes.map((item, index) => (
          <Link href={item.href} key={`special-class-${index}`} className="xl:w-[380px] xl:h-[375px] md:w-[320px] md:h-[315px] w-[calc(100%-40px)] h-64 xl:p-5 md:p-4 p-2.5 rounded-2xl shadow-lg md:first:mr-7 md:mt-0 mt-6 relative z-10 bottom-0 md:hover:bottom-3 md:hover:shadow-xl transition-all duration-300" style={{backgroundColor: item.bgColor}}>
            <div className="w-full xl:h-12 md:h-10 h-9 rounded-lg flex xl:text-base md:text-sm text-xs items-center justify-end px-5" style={{backgroundColor: item.pointColor}}>
              {item.age}
            </div>
            <div className="absolute xl:top-8 md:top-7 top-6 xl:left-9 md:left-8 left-6 xl:w-40 xl:h-20 md:w-36 md:h-16 w-28 h-16 backdrop-blur-lg border-[2.5px] border-white rounded-xl shadow-md flex items-center justify-center">
              <img src={item.logoPath} alt={item.title} className="h-4/6"/>
            </div>
            <div className="xl:mt-20 md:mt-16 mt-14 md:h-28 h-20 xl:text-xl md:text-lg text-sm leading-relaxed flex items-center justify-center text-center">
              <span dangerouslySetInnerHTML={{ __html: item.desc }}></span>
            </div>
            <div className="xl:text-3xl md:text-2xl text-lg font-bold text-center md:mt-5 mt-2.5" style={{color: item.titleColor}}>
              {item.title}
            </div>
          </Link>
        ))}           
      </div>
      <div className={`w-full md:h-[425px] h-[690px] rounded-3xl relative md:bottom-52 -mb-[264px] bg-white md:pt-64 pt-7 text-center ${styles['deem-shadow-1']}`}>
        <div className='md:text-2xl text-base font-bold relative flex justify-center'>
          <span className='z-10'>사고력 수학이란?</span>
          <div className='md:w-48 w-28 md:h-4 h-3 bg-yellow-1 absolute bottom-1'></div>
        </div>
        <div className='mt-4 md:text-lg text-xs leading-relaxed'>
          사고하면서 심화 수학에 접근하는 <b className='text-green-2'>연습</b>으로, <br/>
          심화 문제 해결을 너머 상위권 <b className='text-green-2'>대학 입시</b>를 향한 첫걸음입니다.
        </div>
      </div> 
    </div>
  </>
}