interface TitleProps {
  title: string;
  subtitle?: string;
  color?: string;
}

const Title = ({ title, subtitle, color }: TitleProps) => { 
  return <div 
    className={`text-2xl font-bold NanumSquare mb-10 ${color ? `text-[${color}]` : 'text-black'}`}
  >
    {title}
    {subtitle && <div className="text-base text-gray-1 mt-2">{subtitle}</div>}
  </div>
}

export default Title;