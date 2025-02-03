"use client"

import useUser from "@/app/_hooks/useUser";
import { IBoard } from "@/app/_service/board";
import { IPost, PostSavePayload, postService } from "@/app/_service/post";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import CKEditorComponent from "../CKEditor/CKEditor";
import Select from "../Input/Select";
import TextField from "../Input/TextField";
import Toggle from "../Input/Toggle";
import { useToast } from "../Toast/ToastProvider";

interface PostEditFormProps {
  post?: IPost | null;
  boardList: IBoard[];
}

const PostEditForm = ({ post, boardList }: PostEditFormProps) => {
  const router = useRouter();
  const { addToast } = useToast();
  const { user } = useUser();

  const { register, handleSubmit, getValues, setValue, watch, formState: { errors }, reset } = useForm<PostSavePayload>({
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

  const onSubmit = async (data: PostSavePayload) => {
    if (!data.title || !data.content) {
      addToast({
        type: "error",
        message: "제목과 내용을 입력해주세요."
      })
      return;
    }
    if (!boardList.map(board => board.id).includes(data.boardId)) {
      addToast({
        type: "error",
        message: "게시판을 선택해주세요."
      })
      return;
    }
  
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
          <CKEditorComponent onChange={(data) => {setValue("content", data)}} initialContent={post?.content || ""}/>
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="md:w-80 w-full">
            <Button type="submit" color="green" fullWidth>게시글 등록</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostEditForm;