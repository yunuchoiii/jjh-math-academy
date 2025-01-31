const SpeechBubbleSvg = ({color}: {color: string}) => {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.000133514 20L0 0H20L0.000133514 20Z" fill={color}/>
  </svg>
}

interface SpeechBubbleProps {
  children: React.ReactNode;
  color: "yellow" | "green" | "blue";
  position?: "left" | "right";
}

const SpeechBubble = ({color, children, position="left"}: SpeechBubbleProps) => {
  const backgroundColor = color === "yellow" ? "#FFF5D3" : color === "green" ? "#E6F1DD" : "#EBF1F1";
  const textColor = color === "yellow" ? "text-yellow-6" : color === "green" ? "text-green-2" : "text-blue-2";
  return <section className="relative w-fit">
    <div
      className={`px-[30px] py-5 rounded-[30px] ${textColor}`}
      style={{
        backgroundColor,
      }}
    >
      {children}
    </div>
    <div className={`relative ${position === "left" ? "left-[30px]" : "right-[30px] transform scale-x-[-1]"}`}>
      <SpeechBubbleSvg color={backgroundColor} />
    </div>
  </section>;
};

export default SpeechBubble;