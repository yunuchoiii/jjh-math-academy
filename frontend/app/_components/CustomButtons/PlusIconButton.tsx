import Image from "next/image"

type IPlusIconButton = {
  color: string
  size: number
}

const PlusIconButton = (button:IPlusIconButton) => {

  return <button 
    className={`rounded-full flex items-center justify-center`} 
    style={{
      width: button.size,
      height: button.size,
      backgroundColor: button.color,
    }}
  >
    <Image 
      src="/images/icons/plus_icon.png" 
      alt="자세히보기" 
      className="invert max-w-[50%] max-h-[50%]" 
      width={button.size} 
      height={button.size}
    />
  </button>
}

export default PlusIconButton;