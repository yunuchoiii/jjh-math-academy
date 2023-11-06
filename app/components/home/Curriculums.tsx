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
      color: '#EFC223',
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
  return <div>
    {curriculumList.map((item, index) =>  (
      <div key={`curriculum-${index}`} className={`w-full xl:h-[300px] lg:h-64 bg-white xl:rounded-tr-[138px] xl:rounded-bl-[138px] lg:rounded-tr-[126px] lg:rounded-bl-[126px] first:mb-10 xl:pb-9 xl:pl-9 lg:pb-7 lg:pl-7 relative ${styles['deem-shadow-2']}`}>
        <div className={`xl:w-[218px] xl:h-[218px] lg:w-48 lg:h-48 rounded-full bg-gradient-to-b absolute xl:bottom-9 lg:bottom-7 shadow-xl ${index == 0 ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
          <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
            <img src={item.imgPath} alt='curriculum' className={`${index == 0 ? 'xl:w-36 lg:w-32' : 'w-full'}`}/>
          </div>
        </div>
        <div className='xl:pt-10 lg:pt-7 xl:pl-72 lg:pl-60 pr-10 font-bold'>
          <div className='xl:text-xl lg:text-lg text-[#555] xl:mb-2.5 lg:mb-1.5'>
            {item.desc}
          </div>
          <Link href={item.link} className='xl:text-4xl lg:text-3xl' style={{color: item.color}}>
            {item.title}
          </Link>
          <ul className='xl:mt-4 lg:mt-3 xl:text-lg lg:text-base font-medium'>
            {item.contents.map((c, i) => <li key={`curr-li-${i}`} className='list-disc break-keep mt-1'>{c}</li>)}
          </ul>
        </div>
        <Link href={item.link} className='absolute bottom-6 right-8 flex items-center'>
          <span className='xl:text-lg lg:text-base font-semibold text-[#555]'>자세히 보기</span>
          <div className='xl:w-7 xl:h-7 lg:w-6 lg:h-6 rounded-3xl flex items-center justify-center ml-3' style={{backgroundColor: item.iconColor}}>
            <img src="/images/icons/plus_icon.png" className='xl:w-4 xl:h-4 lg:w-3 lg:h-3 invert'/>
          </div>
        </Link>
      </div>
    ))}
  </div>
}