import Link from 'next/link'
import styles from './Layout.module.css'

export default function Curriculums () {
  const curriculumList = [
    {
      title: '초등 교과 수학',
      desc: '초등 수학으로 대입까지',
      contents: [
        '개인 수준별 교재 컨설팅 + 비상 수학플러스러닝 + 매쓰프로 시스템으로 확실하게 잡는 교과 수학',
        '상위권 5~6학년은 \'수능으로 가는 초등 고학년 수학\'을 비롯한 심화수학 진행',
      ],
      color: '#DFB521',
      iconColor: '#FFC736',
      imgPath: '/images/elementary-student.png',
      link: '/curriculum/elementary'
    },
    {
      title: '중등 교과 수학',
      desc: '대입 성공의 시작',
      contents: [
        '개인 수준별 교재 컨설팅 + 비상 수학플러스러닝 + 매쓰프로 시스템으로 확실하게 잡는 교과 수학',
        '상위권 5~6학년은 \'수능으로 가는 초등 고학년 수학\'을 비롯한 심화수학 진행',
      ],
      color: '#41B580',
      iconColor: '#41B580',
      imgPath: '/images/middle-student.png',
      link: '/curriculum/middle'
    },
  ]
  return <>
    <div className='hidden md:block'>
      {curriculumList.map((item, index) =>  (
        <div key={`curriculum-${index}`} className={`w-full xl:h-[300px] md:h-64 bg-white xl:rounded-tr-[138px] xl:rounded-bl-[138px] md:rounded-tr-[126px] md:rounded-bl-[126px] first:mb-10 xl:pb-9 xl:pl-9 md:pb-7 md:pl-7 relative ${styles['deem-shadow-2']}`}>
          <div className={`xl:w-[218px] xl:h-[218px] md:w-48 md:h-48 rounded-full bg-gradient-to-b absolute xl:bottom-9 md:bottom-7 shadow-xl ${index == 0 ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
            <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
              <img src={item.imgPath} alt='curriculum' className={`${index == 0 ? 'xl:w-36 md:w-32' : 'w-full'}`}/>
            </div>
          </div>
          <div className='xl:pt-10 md:pt-7 xl:pl-72 md:pl-60 pr-10 font-bold'>
            <div className='xl:text-xl md:text-lg text-[#555] xl:mb-2.5 md:mb-1.5'>
              {item.desc}
            </div>
            <Link href={item.link} className='xl:text-4xl md:text-3xl' style={{color: item.color}}>
              {item.title}
            </Link>
            <ul className='xl:mt-4 md:mt-3 xl:text-lg md:text-base font-medium'>
              {item.contents.map((c, i) => <li key={`curr-li-${i}`} className='list-disc break-keep mt-1'>{c}</li>)}
            </ul>
          </div>
          <Link href={item.link} className='absolute bottom-6 right-8 flex items-center'>
            <span className='xl:text-lg md:text-base font-semibold text-[#555]'>자세히 보기</span>
            <div className='xl:w-7 xl:h-7 md:w-6 md:h-6 rounded-3xl flex items-center justify-center ml-3' style={{backgroundColor: item.iconColor}}>
              <img src="/images/icons/plus_icon.png" className='xl:w-4 xl:h-4 md:w-3 md:h-3 invert'/>
            </div>
          </Link>
        </div>
      ))}
    </div>
    <div className='block md:hidden px-5'>
      {curriculumList.map((item, index) =>  (
        <Link key={`curriculum-mobile-${index}`} className='first:mb-16 flex flex-col items-center' href={item.link}>
          <div className={`w-40 h-40 relative rounded-full bg-gradient-to-b shadow-xl ${index == 0 ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
            <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
              <img src={item.imgPath} alt='curriculum' className={`${index == 0 ? 'xl:w-36 md:w-32 w-[104px]' : 'w-full'}`}/>
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