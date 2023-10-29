export default function PartnersTab () {
  const tabs = [
    {
      title: 'books',
      images: [
        'yorisu.png',
        'visang.png',
        'mathpro.png',
      ]
    },
    {
      title: 'partners',
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

  return <div className="flex justify-between mt-20">
    {tabs.map((tab,index) => <div key={`home-partners-${index}`} className={index==0 ? 'w-[28%]' : 'w-[68%]'}>
      <div className="w-full flex items-center">
        <div className="w-full h-[1px] bg-green-1"></div>
        <div className="px-2 uppercase text-sm Montserrat font-bold">{tab.title}</div>
        <div className="w-full h-[1px] bg-green-1"></div>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        {tab.images.map(i => <img src={`images/icons/${i}`} alt="logo" className="xl:h-8 lg:h-6 grayscale" key={`partner-img-${i}`}></img>)}
      </div>
    </div>)}
  </div>
}