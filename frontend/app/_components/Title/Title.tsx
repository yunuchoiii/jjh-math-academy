interface TitleProps {
  title: string;
  subtitle?: string;
  color?: string;
}

const Title = ({ title, subtitle, color="#333" }: TitleProps) => { 
  return <div 
    className={`text-2xl font-extrabold NanumSquare mb-[60px]`}
    style={{color: color}}
  >
    {title}
    {subtitle && <div className="text-base text-gray-1 mt-2">{subtitle}</div>}
  </div>
}

export default Title;