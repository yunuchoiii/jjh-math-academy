import Link from 'next/link'
import styles from './Layout.module.css'

export default function Curriculums () {
  const curriculumList = [
    {
      title: '초등 교과 수학',
      desc: '초등 수학으로 대입까지',
      contents: [
        '사고력 수학을 통해 단순 연산을 넘어 수학적 사고와 문제 해결 능력 성장',
        '기초 개념부터 심화 학습까지, 고학년에서도 흔들리지 않는 수학 실력',
      ],
      color: '#DFB521',
      iconColor: '#FFC736',
      imgPath: '/images/elementary-student.png',
      link: '/common-math/elementary'
    },
    {
      title: '중등 교과 수학',
      desc: '대입 성공의 시작',
      contents: [
        '내신 대비를 넘어 사고력 중심의 심화 학습으로 고등 수학 및 입시 준비',
        '어려운 문제도 스스로 해결할 수 있도록 사고력과 논리력을 동시에!',
      ],
      color: '#41B580',
      iconColor: '#41B580',
      imgPath: '/images/middle-student.png',
      link: '/common-math/middle'
    },
  ]
  return <>
    <div className='hidden md:block'>
      {curriculumList.map((item, index) =>  (
        <Link href={item.link} 
          key={`curriculum-${index}`} 
          className={`block w-full xl:h-[300px] md:h-64 bg-white xl:rounded-tr-[138px] xl:rounded-bl-[138px] md:rounded-tr-[126px] md:rounded-bl-[126px] first:mb-10 xl:pb-9 xl:pl-9 md:pb-7 md:pl-7 relative border-4 border-transparent transition-all duration-300 cursor-pointer hover:scale-[103%] active:scale-100 shadow-[0px_0px_40px_0px_rgba(190,190,190,0.25)] hover:shadow-[0px_0px_60px_0px_rgba(190,190,190,0.5)] ${index == 0 ? 'hover:border-yellow-1' : 'hover:border-green-1'}`}
        >
          <div className={`xl:w-[218px] xl:h-[218px] md:w-48 md:h-48 rounded-full bg-gradient-to-b absolute xl:bottom-9 md:bottom-7 shadow-xl ${index == 0 ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
            <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
              <img src={item.imgPath} alt='curriculum' className={`${index == 0 ? 'xl:w-36 md:w-32' : 'w-full'}`} loading='lazy'/>
            </div>
          </div>
          <div className='xl:pt-10 md:pt-7 xl:pl-72 md:pl-60 pr-10 font-bold'>
            <div className='xl:text-xl md:text-lg text-[#555] xl:mb-2.5 md:mb-1.5'>
              {item.desc}
            </div>
            <div className='xl:text-4xl md:text-3xl' style={{color: item.color}}>
              {item.title}
            </div>
            <ul className='xl:mt-4 md:mt-3 xl:text-lg md:text-base font-medium'>
              {item.contents.map((c, i) => <li key={`curr-li-${i}`} className='list-disc break-keep mt-1'>{c}</li>)}
            </ul>
          </div>
          <div className='absolute bottom-6 right-8 flex items-center'>
            <span className='xl:text-lg md:text-base font-semibold text-[#555]'>자세히 보기</span>
            <div className='xl:w-7 xl:h-7 md:w-6 md:h-6 rounded-3xl flex items-center justify-center ml-3' style={{backgroundColor: item.iconColor}}>
              <img src="/images/icons/plus_icon.png" className='xl:w-4 xl:h-4 md:w-3 md:h-3 invert'/>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <div className='block md:hidden px-5'>
      {curriculumList.map((item, index) =>  (
        <Link key={`curriculum-mobile-${index}`} className='first:mb-16 flex flex-col items-center active:scale-95 transition-all duration-300' href={item.link}>
          <div className={`w-40 h-40 relative rounded-full bg-gradient-to-b shadow-xl ${index == 0 ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
            <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
              <img src={item.imgPath} alt='curriculum' className={`${index == 0 ? 'xl:w-36 md:w-32 w-[104px]' : 'w-full'}`} loading='lazy'/>
            </div>
          </div>
          <div className={`w-full rounded-3xl bg-white -mt-20 pt-28 px-6 pb-8 text-center ${styles['deem-shadow-2']}`}>
            <div className='font-bold text-base mb-2'>
              {item.desc}
            </div>
            <div className='font-bold text-xl mb-6' style={{color: item.color}}>
              {item.title}
            </div>
            <ul className='pl-6 text-left text-sm font-semibold'>
              {item.contents.map((c, i) => <li 
                key={`curr-li-${i}`} 
                className='list-disc break-keep mt-1'
              >
                {c}
              </li>)}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  </>
}