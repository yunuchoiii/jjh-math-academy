import SideMenu from "./SideMenu";

const Body = ({children}: {children: React.ReactNode}) => {
  return <div className="flex justify-center pt-[100px] lg:pt-[140px]">
    <div className="w-full flex justify-center gap-10 2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl px-5 sm:px-0">
      <SideMenu/>
      <div className="w-full md:w-auto md:flex-1">
        {children}
      </div>
    </div>
  </div>;
};

export default Body;