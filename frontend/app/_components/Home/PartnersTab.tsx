import Image from "next/image";

const PartnersTab = () => {
  const bookPublishers = [
    "mirae-n.png",
    "visang.png",
    "cheonjae.png",
    "didimdol.png",
    "donga.png",
    "sinsago.png",
    "neungryul.png",
  ];

  return (
    <div className="px-0 md:px-5 lg:px-0">
      <article className="flex flex-col mt-20">
        <header className="w-full flex items-center">
          <div className="w-full h-[1px] bg-green-1"></div>
          <h2 className="px-2 uppercase text-sm Montserrat font-bold">Books</h2>
          <div className="w-full h-[1px] bg-green-1"></div>
        </header>
        <section className="relative mt-5 overflow-hidden w-full">
          <div className="absolute z-10 top-0 left-0 w-16 h-full bg-gradient-to-r from-[#F9F9F9] to-transparent"></div>
          <div className="absolute z-10 top-0 right-0 w-16 h-full bg-gradient-to-l from-[#F9F9F9] to-transparent"></div>
          <div className="infinite-scroll xl:gap-x-[72px] lg:gap-x-14 md:gap-x-12 gap-x-5">
            {[...bookPublishers, ...bookPublishers, ...bookPublishers].map((i, index) => (
              <Image
                key={`partner-img-${i}-${index}`}
                src={`/images/icons/${i}`}
                alt="logo"
                className="xl:h-8 md:h-6 h-5 grayscale"
                width={100}
                height={100}
              />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

export default PartnersTab;