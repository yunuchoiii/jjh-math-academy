"use client";

import { IAttachment } from "@/app/_service/attachment";
import { formatFileSize } from "@/app/_utils";
import { useState } from "react";
import styled from "styled-components";

interface FileUploadProps {
  files: File[]; // 업로드할 파일 state
  addFiles: (event: React.ChangeEvent<HTMLInputElement>) => void // 파일 변경 이벤트 핸들러
  initialFiles?: IAttachment[]; // 초기 업로드된 파일
  removeFile: (file: File) => void // 파일 제거 이벤트 핸들러
  removeInitialFile: (file: IAttachment) => void // 초기 업로드된 파일 제거 이벤트 핸들러
}

const Container = styled.section`
  & input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`

const FileItem = ({ file, onRemove, isInitial }: { file: File | IAttachment, onRemove: (file: File | IAttachment) => void, isInitial: boolean }) => {
  return <div className="bg-lightgray-1 pl-2.5 py-2 flex items-center justify-between border border-lightgray-2 rounded-lg">
    <div className="flex-1 ellipsis">
      <span>{isInitial ? (file as IAttachment).fileName : (file as File).name}</span>&nbsp;
      <span className="text-sm text-[#999]">({formatFileSize(isInitial ? (file as IAttachment).fileSize : (file as File).size)})</span>
    </div>
    <button 
      className="w-10 h-full flex-shrink-0"
      onClick={(e) => {
        e.preventDefault();
        onRemove(file);
      }}
    >
      <i className="fas fa-times"></i>
    </button>
  </div>
};

const FileUpload = ({ files, addFiles, initialFiles, removeFile, removeInitialFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const files = e.dataTransfer.files;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    addFiles({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
  };

  return <Container className="flex items-center gap-2.5">
    <div 
      className="flex flex-col items-center justify-center gap-4 w-full border border-[#CCCED1] rounded-md px-5 py-4"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="text-sm mb-1 w-full flex items-center gap-2">
        <i className="fas fa-paperclip text-green-1"></i>
        <span>파일 첨부</span>
      </div>
      <div 
        className="overflow-y-auto w-full h-[240px] md:h-[180px] border-2 border-dashed rounded-xl p-2.5"
        style={{
          borderColor: isDragging ? "#41B580" : "#DEDEDE"
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5">
          <div className="flex flex-col md:flex-row items-center gap-2.5 text-green-1">
            <i className="fas fa-cloud-upload-alt text-3xl"></i>
            <p className="text-base">파일을 마우스로 끌어오세요.</p>
          </div>
          <p className="text-sm text-[#999]">최대 10mb 이하 파일 첨부 가능</p>
          <label 
            htmlFor="file"
            className="px-3 py-2 flex items-center justify-center bg-lightgray-3 text-[#666] font-medium hover:brightness-95 text-sm rounded-md cursor-pointer mt-5"
          >
            파일 가져오기
          </label> 
        </div>
      </div>
      {(files.length > 0 || (initialFiles && initialFiles.length > 0)) && (
        <div className="flex flex-col gap-2 lg:w-2/3 xl:w-1/2 w-full">
          {initialFiles && initialFiles.length > 0 && 
            initialFiles.map((file, index) => (
              <FileItem 
                key={`${file.fileName}-${index}`} 
                file={file} 
                onRemove={removeInitialFile as (file: File | IAttachment) => void} 
                isInitial={true} 
              />
            ))}
          {files.map((file, index) => (
            <FileItem 
              key={`${file.name}-${index}`} 
              file={file} 
              onRemove={removeFile as (file: File | IAttachment) => void} 
              isInitial={false} 
            />
          ))}
        </div>
      )}
    </div>
    <input 
      id="file"
      type="file" 
      name="file" 
      multiple 
      onChange={addFiles} 
    />
  </Container>
};

export default FileUpload;