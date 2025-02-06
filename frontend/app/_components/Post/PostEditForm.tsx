"use client"

import useUser from "@/app/_hooks/useUser";
import { attachmentService, IAttachment } from "@/app/_service/attachment";
import { IBoard } from "@/app/_service/board";
import { IPost, PostSavePayload, postService } from "@/app/_service/post";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import CKEditorComponent from "../CKEditor/CKEditor";
import FileUpload from "../Input/FileUpload";
import Select from "../Input/Select";
import TextField from "../Input/TextField";
import Toggle from "../Input/Toggle";
import { useToast } from "../Toast/ToastProvider";

interface PostEditFormProps {
  post?: IPost | null;
  boardList: IBoard[];
  initialFiles?: IAttachment[];
}

const PostEditForm = ({ post, boardList, initialFiles }: PostEditFormProps) => {
  const router = useRouter();
  const { addToast } = useToast();
  const { user } = useUser();

  const [isUploading, setIsUploading] = useState({
    post: false,
    attachments: false
  });

  const [files, setFiles] = useState<File[]>([]); // 업로드할 파일
  const [initialAttachments, setInitialAttachments] = useState<IAttachment[]>([]); // 업로드된 파일
  const [removedAttachments, setRemovedAttachments] = useState<IAttachment[]>([]); // 삭제된 파일

  useEffect(()=>{
    if (initialFiles) {
      setInitialAttachments(initialFiles);
    }
  }, [initialFiles]);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<PostSavePayload>({
    defaultValues: {
      ...post,
      authorId: user?.userId
    }
  });

  useEffect(() => {
    reset({
      ...post,
      authorId: user?.userId
    });
  }, [post, reset, user]);

  const callback = (data: PostSavePayload) => {
    addToast({
      type: "success",
      message: "게시글이 등록되었습니다."
    })
  }

  const errorCallback = (error: AxiosError) => {
    addToast({
      type: "error",
      message: "게시글 등록에 실패하였습니다."
    })
    console.error(error);
  }

  // 파일 변경 핸들러
  const handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  // 파일 제거 핸들러
  const handleRemoveFile = (file: File) => {
    setFiles(files.filter(f => f !== file));
  }

  // 초기 업로드된 파일 제거 핸들러
  const handleRemoveAttachment = (file: IAttachment) => {
    setRemovedAttachments([...removedAttachments, file]);
    setInitialAttachments(initialAttachments.filter(a => a.id !== file.id));
  }

  // 파일 업로드
  const uploadFiles = async (files: File[]) => {
    setIsUploading({ ...isUploading, attachments: true });
    try {
      const data = post?.attachmentGroupId ? {
        files,
        attachmentGroupId: post?.attachmentGroupId
      } : { files };
      const res = await attachmentService.uploadMultipleFiles(data);
      const attachmentGroupId = res[0].attachmentGroupId;
      return attachmentGroupId;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsUploading({ ...isUploading, attachments: false });
    }
  }

  // 저장된 첨부파일 삭제
  const removeAttachments = async () => {
    setIsUploading({ ...isUploading, attachments: true });
    try {
      Promise.all(removedAttachments.map(async (file) => {
        await attachmentService.deleteAttachment(file.id);
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading({ ...isUploading, attachments: false });
    }
  }

  // 게시글 등록
  const uploadPost = async (data: PostSavePayload) => {
    setIsUploading({ ...isUploading, post: true });
    try {
      if (!post) {
        const res = await postService.createPost({
          callback: () => callback(data),
          errorCallback: (error) => errorCallback(error),
          data
        });
        router.push(`/post/${res.id}/view`);
        router.refresh();
      } else {
        await postService.updatePost({
          callback: () => callback(data),
          errorCallback: (error) => errorCallback(error),
          data,
          postId: post.id
        });
        router.push(`/post/${post.id}/view`);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading({ ...isUploading, post: false });
    }
  }

  const onSubmit = async (data: PostSavePayload) => {
    // 첫 번째 이미지 태그의 src 추출
    const imgTagMatch = data.content.match(/<img[^>]+src="([^">]+)"/);
    const thumbnail = imgTagMatch ? imgTagMatch[1] : null;

    // validation
    if (!data.title || !data.content) {
      addToast({
        type: "error",
        message: "제목과 내용을 입력해주세요."
      });
      return;
    }
    if (!boardList.map(board => board.id).includes(data.boardId)) {
      addToast({
        type: "error",
        message: "게시판을 선택해주세요."
      });
      return;
    }

    try {
      // 저장된 첨부파일 삭제
      if (removedAttachments.length > 0) {
        await removeAttachments();
      }

      let attachmentGroupId = null;
      // 첨부파일 있을 때 
      if (files.length > 0) {
        // 파일 업로드
        attachmentGroupId = await uploadFiles(files);
        if (!attachmentGroupId) { // 파일 업로드 실패 시
          addToast({
            type: "error",
            message: "파일 업로드에 실패하였습니다."
          });
          return;
        }
      }

      // 게시글 등록
      const dataWithAttachmentGroupId = {
        ...data,
        ...(attachmentGroupId && { attachmentGroupId }),
        ...(thumbnail && { thumbnail })
      };
      await uploadPost(dataWithAttachmentGroupId);

    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: "게시글 등록 중 오류가 발생하였습니다."
      });
    } finally {
      setIsUploading({ attachments: false, post: false });
    }
  }

  return (
    <div>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-2 sm:col-span-1">
          <Select
            label="게시판"
            options={[
              { value: 0, label: "게시판 선택" },
              ...boardList.map((board) => ({ value: board.id, label: board.name })),
            ]}
            value={watch("boardId")}
            onChange={(value) => setValue("boardId", value)}
            position="horizontal"
            error={errors.boardId}
          />
        </div>
        <div className="col-span-2 sm:col-span-1 w-fit">
          <Toggle
            label="공지"
            checked={watch("isNotice")}
            onChange={(checked) => {setValue("isNotice", checked)}}
          />
        </div>
        <div className="col-span-2">
          <TextField
            label="제목"
            placeholder="제목을 입력해주세요."
            inputType="text"
            register={register("title", { required: "제목을 입력해주세요." })}
            error={errors.title}
          />
        </div>
        <div className="col-span-2">
          <CKEditorComponent 
            onChange={(data) => {setValue("content", data)}} 
            initialContent={post?.content || ""}
          />
        </div>
        <div className="col-span-2">
          <FileUpload
            files={files}
            initialFiles={initialAttachments}
            addFiles={handleAddFiles} 
            removeFile={handleRemoveFile}
            removeInitialFile={handleRemoveAttachment}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="md:w-80 w-full">
            <Button 
              type="submit" 
              color="green" 
              fullWidth
              disabled={isUploading.attachments || isUploading.post}
            >
              {
                isUploading.attachments ? "파일 업로드 중..." :
                isUploading.post ? "게시글 등록 중..." :
                "게시글 등록"
              }
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm;