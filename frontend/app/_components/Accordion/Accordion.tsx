"use client"

import { useState } from "react"

export interface IAccordionElement {
  id: number
  title: string
  sort?: number
  children?: IAccordionElement[]
}

interface AccordionProps {
  parent: IAccordionElement
  children: IAccordionElement[]
  onClick: (id: number) => void
  selectedId: number | null
}

const Accordion = ({ parent, children, onClick, selectedId }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onParentTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onClick(parent.id)
  }

  const onParentClick = () => {
    if (children.length > 0) {
      setIsOpen(!isOpen);
    } else {
      onClick(parent.id);
    }
  }

  return <section className="w-full">
    <button 
      className={`w-full flex justify-between items-center pl-2.5 pr-3 h-[36px] my-0.5 rounded-xl hover:bg-[#F3F3F3] transition-all duration-300 ${selectedId === parent.id ? 'bg-[#F3F3F3] font-semibold' : ''} ${children.length === 0 ? 'mb-1' : ''}`} 
      onClick={onParentClick}
    >
      <div className="hover:underline underline-offset-4" onClick={onParentTitleClick}>
        {parent.title}
      </div>
      {children.length > 0 && (
        <div>
          {isOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
        </div>
      )}
    </button>
    {children.sort((a, b) => a.sort! - b.sort!).map((child) => (
      <div 
        key={child.id} 
        className={`pl-4 overflow-hidden transition-all duration-300 ${isOpen ? 'h-[40px]' : 'h-0'}`}
      >
        <Accordion 
          parent={child}
          children={child.children || []}
          onClick={onClick} 
          selectedId={selectedId}
        />
      </div>
    ))}
  </section>;
}

export default Accordion;