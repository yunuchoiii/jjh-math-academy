"use client";

import { IAttachment } from "@/app/_service/attachment";
import { useState } from "react";

interface PostContentsProps {
  content: string;
  attachments: IAttachment[];
}

const PostContents = ({ content, attachments }: PostContentsProps) => {
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);

  const downloadAttachment = async(file:IAttachment) => {
    window.open(file.filePath, '_blank');
  };

  return <div className="relative px-2.5 py-10 lg:py-20 border-t border-b border-[#CCCCCC] ck-content">
      <div className="absolute top-5 right-2.5 flex flex-col items-end gap-2">
        <button 
          className="flex items-center gap-1"
          onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
        >
          <span className="text-sm">첨부파일</span>
          <i className={`fas ${isAttachmentOpen ? "fa-chevron-up" : "fa-chevron-down"} text-xs`}></i>
        </button>
        {isAttachmentOpen && (
          <div className="max-w-[300px] px-2.5 py-1.5 bg-lightgray-1 border border-lightgray-3 rounded-lg mr-2">
            {attachments.map((attachment) => (
              <button 
                key={attachment.id} 
                className="md:h-6 h-8 w-full flex items-center justify-between gap-2 text-sm hover:text-green-1"
                onClick={() => downloadAttachment(attachment)}
              >
                <span className="ellipsis">{attachment.fileName}</span>
                {/* <i className="fas fa-arrow-down text-xs border-b-2 pb-[1px]"></i> */}
              </button>
            ))}
          </div>
        )}
      </div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
};

export default PostContents;