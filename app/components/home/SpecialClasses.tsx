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
    <div className="flex flex-col relative">
      <div className="flex justify-center">
        {classes.map((item, index) => (
          <Link href={item.href} key={`special-class-${index}`} className="xl:w-[380px] xl:h-[375px] lg:w-[320px] lg:h-[315px] xl:p-5 lg:p-4 rounded-2xl shadow-lg first:mr-7 relative z-10 bottom-0 hover:bottom-2 hover:shadow-xl transition-all" style={{backgroundColor: item.bgColor}}>
            <div className="w-full xl:h-12 lg:h-10 rounded-lg flex xl:text-base lg:text-sm items-center justify-end px-5" style={{backgroundColor: item.pointColor}}>
              {item.age}
            </div>
            <div className="absolute xl:top-8 lg:top-7 xl:left-9 lg:left-8 xl:w-40 xl:h-20 lg:w-36 lg:h-16 backdrop-blur-lg border-[2.5px] border-white rounded-xl shadow-md flex items-center justify-center">
              <img src={item.logoPath} alt={item.title} className="h-4/6"/>
            </div>
            <div className="xl:mt-20 lg:mt-16 h-28 xl:text-xl lg:text-lg leading-relaxed flex items-center justify-center text-center">
              <span dangerouslySetInnerHTML={{ __html: item.desc }}></span>
            </div>
            <div className="xl:text-3xl lg:text-2xl font-bold text-center mt-5" style={{color: item.titleColor}}>
              {item.title}
            </div>
          </Link>
        ))}           
      </div>
      <div className={`w-full h-[425px] rounded-3xl relative bottom-52 -mb-52 bg-white pt-64 text-center ${styles['deem-shadow-1']}`}>
        <div className='text-2xl font-bold relative flex justify-center'>
          <span className='z-10'>사고력 수학이란?</span>
          <div className='w-48 h-4 bg-yellow-1 absolute bottom-1'></div>
        </div>
        <div className='mt-4 text-lg'>
          사고하면서 심화 수학에 접근하는 <b className='text-green-2'>연습</b>으로, <br/>
          심화 문제 해결을 너머 상위권 <b className='text-green-2'>대학 입시</b>를 향한 첫걸음입니다.
        </div>
      </div> 
    </div>
  </>
}