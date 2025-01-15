interface TitleProps {
  title: string;
  subtitle?: string;
  color?: "green" | "yellow" | "blue" | "black";
}

const Title = ({ title, subtitle, color="black" }: TitleProps) => { 
  const textColor = {
    green: '#41B580',
    yellow: '#EFC223',
    blue: '#4C7E82',
    black: '#333',
  }
  return <div 
    className={`text-2xl font-extrabold NanumSquare mb-[40px]`}
    style={{color: textColor[color]}}
  >
    {title}
    {subtitle && <div className="text-base text-gray-1 mt-2">{subtitle}</div>}
  </div>
}

export default Title;