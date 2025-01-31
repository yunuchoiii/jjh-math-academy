import useIntersection from "@/app/_hooks/useIntersection";
import SpeechBubble from "../Quote/SpeechBubble";

interface ReactionBubblesProps {
  title: string;
  color: "green" | "yellow";
  reactions: React.ReactNode[];
  teacherWords: React.ReactNode;
}

const ReactionBubbles = ({ title, color, reactions, teacherWords }: ReactionBubblesProps) => {
  const allReactions = [...reactions, teacherWords];

  const { ref, isIntersected } = useIntersection(0.5);

  return <div className="flex justify-center items-center w-full">
    <div className="2xl:w-[80rem] xl:w-[72rem] lg:w-[56rem] md:w-[48rem] sm:w-[36rem] w-full max-w-[995px] min-w-[300px] px-5 md:py-[120px] py-[60px]">
      <div className="bg-[#444] p-[5px] md:p-5 rounded-[30px] md:rounded-[40px] shadow-2xl">
        <div className="relative flex flex-col gap-5 bg-white px-5 md:px-8 pt-16 md:pt-20 pb-10 rounded-[25px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-10 border-b border-lightgray-3 flex items-center justify-center">
            <p className="font-bold NanumSquare text-black">조재현 수학학원</p>
          </div>
          <div ref={ref} className="relative flex flex-col gap-5">
            {allReactions.map((reaction, index) => {
              const isTeacher = index === reactions.length;
              return <div 
                key={`${title}-reaction-${index}`} 
                className={`relative flex transition-all duration-500 ${isTeacher ? "justify-end" : "justify-start"} ${isIntersected ? "fade-in-bottom opacity-100" : " opacity-0"}`}
                style={{
                  animationDelay: `${index * 0.7}s`,
                }}
              >
                <SpeechBubble 
                  color={isTeacher ? "blue" : color} 
                  position={isTeacher ? "right" : "left"}
                  profile={
                    isTeacher ? 
                    {name: "선생님", image: "/images/icons/female-user.png"} : 
                    {name: `${String.fromCharCode(65+index)} 학생 학부모님`}
                  }
                >
                  <div className="font-medium">
                    {reaction}
                  </div>
                  {isTeacher && <p>지금 바로 상담 받아보세요!</p>}
                </SpeechBubble>
              </div>
          })}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ReactionBubbles;