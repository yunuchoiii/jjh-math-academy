const SpeechBubbleSvg = ({color}: {color: string}) => {
  return <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.000133514 40L0 0H30L0.000133514 40Z" fill={color}/>
  </svg>
}

interface SpeechBubbleProps {
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
  position?: "left" | "right";
}

const SpeechBubble = ({color, backgroundColor, children, position="left"}: SpeechBubbleProps) => {
  return <section className="relative w-fit">
    <div
      className="px-[30px] py-5 rounded-[30px]"
      style={{
        backgroundColor,
        color,
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