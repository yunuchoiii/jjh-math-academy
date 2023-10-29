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
      imgPath: '/images/elementary-student.png'
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
      imgPath: '/images/middle-student.png'
    },
  ]
  return <div>
    {curriculumList.map((item, index) =>  (
      <div key={`curriculum-${index}`} className={`w-full h-[300px] bg-white rounded-tr-[138px] rounded-bl-[138px] first:mb-10 pb-9 pl-9 relative ${styles['deem-shadow-2']}`}>
        <div className={`w-[218px] h-[218px] rounded-full bg-gradient-to-b absolute bottom-9 ${index == 0 ? 'from-yellow-1 to-yellow-3' : 'from-green-1 to-green-2'}`}>
          <div className='absolute bottom-0 w-full flex justify-center rounded-bl-full rounded-br-full overflow-hidden'>
            <img src={item.imgPath} alt='curriculum' className={`${index == 0 ? 'w-36' : 'w-full'}`}/>
          </div>
        </div>
        <div className='pt-10 pl-72 pr-10 font-bold'>
          <div className='text-xl text-[#555] mb-2.5'>
            {item.desc}
          </div>
          <div className='text-4xl' style={{color: item.color}}>
            {item.title}
          </div>
          <ul className='mt-4 text-lg font-semibold'>
            {item.contents.map(c => <li className='list-disc break-keep'>{c}</li>)}
          </ul>
        </div>
        <div className='absolute bottom-6 right-8 flex items-center'>
          <span className='text-lg font-semibold text-[#555]'>자세히 보기</span>
          <div className='w-7 h-7 rounded-3xl flex items-center justify-center ml-3' style={{backgroundColor: item.iconColor}}>
            <img src="/images/icons/plus_icon.png" className='w-4 h-4 invert'/>
          </div>
        </div>
      </div>
    ))}
  </div>
}