
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
    <img src="/images/icons/plus_icon.png" alt="자세히보기" className="invert w-1/2"/>
  </button>
}

export default PlusIconButton;