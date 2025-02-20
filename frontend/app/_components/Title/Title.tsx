interface TitleProps {
  title: string;
  subtitle?: string;
  showInMobile?: boolean;
  color?: "green" | "yellow" | "blue" | "black";
}

const Title = ({ title, subtitle, color="black", showInMobile=false }: TitleProps) => { 
  const textColor = {
    green: '#41B580',
    yellow: '#EFC223',
    blue: '#4C7E82',
    black: '#333',
  }

  return <div 
    className={`NanumSquare mb-10 ${showInMobile ? 'block' : 'hidden lg:block'}`}
    style={{color: textColor[color]}}
  >
    <h1 className="text-2xl font-extrabold">{title}</h1>
    {subtitle && <h2 className="text-base font-bold text-gray-1 mt-2">{subtitle}</h2>}
  </div>
}

export default Title;