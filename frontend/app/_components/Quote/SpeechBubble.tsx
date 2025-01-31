import Image from "next/image";

interface SpeechBubbleProps {
  children: React.ReactNode;
  color: "yellow" | "green" | "blue";
  position?: "left" | "right";
  profile?: {
    name?: string;
    image?: string;
  }
}

const SpeechBubble = ({color, children, position="left", profile}: SpeechBubbleProps) => {
  const backgroundColor = color === "yellow" ? "#FFF5D3" : color === "green" ? "#E6F1DD" : "#EBF1F1";
  const textColor = color === "yellow" ? "text-yellow-6" : color === "green" ? "text-green-2" : "text-blue-2";
  const borderColor = color === "yellow" ? "border-yellow-6" : color === "green" ? "border-green-4" : "border-blue-1";
  return <section className={`relative w-fit max-w-[90%] flex gap-2 ${position === "right" ? "flex-row-reverse" : ""}`}>
    <div className={`flex items-center justify-center rounded-full flex-shrink-0 w-[30px] h-[30px] overflow-hidden border ${borderColor}`} style={{backgroundColor}}>
      <Image 
        src={profile?.image ? profile.image : "/images/icons/user.png"} 
        alt={profile?.name ? profile.name : "사용자"} 
        width={profile?.image ? 40 : 25} 
        height={profile?.image ? 40 : 25} 
        className={`${profile?.image ? "" : "opacity-50"}`}
      />
    </div>
    <div className={`flex-1 flex flex-col ${position === "right" ? "items-end" : "items-start"}`}>
      <p className={`text-sm font-medium ${profile?.image ? "text-black" : "text-[#666]"} h-[30px] mb-1 flex items-center`}>
        {profile?.name ? profile.name : "학부모님"}
      </p>
      <div
        className={`px-[30px] py-5 rounded-[30px] ${position === "right" ? "rounded-tr-none" : "rounded-tl-none"} ${textColor}`}
        style={{
          backgroundColor,
        }}
      >
        {children}
      </div>
    </div>
  </section>;
};

export default SpeechBubble;