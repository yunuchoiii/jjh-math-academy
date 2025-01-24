"use client";

import CKEditorComponent from "@/app/_components/CKEditor/CKEditor";
import TextField from "@/app/_components/Input/TextField";
import Title from "@/app/_components/Title/Title";
import useUser from "@/app/_hooks/useUser";
import { postService } from "@/app/_service/post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NewPostPageProps {
  searchParams: {
    boardId: string;
  }
}

const NewPostPage = ({ searchParams }: NewPostPageProps) => {
  const { boardId } = searchParams;
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useUser();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isNotice, setIsNotice] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/auth/login");
      }
    }
  }, [isLoggedIn, isLoading]);

  const createPost = async () => {
    try {
      const post = await postService.createPost({
        callback: () => {
          router.push(`/board/${boardId}`);
        },
        errorCallback: () => {
          console.error("게시글 작성 실패");
        },
        data: {
          boardId: Number(boardId),
          title,
          content,
          authorId: user!.userId,
          isNotice,
          isActive: true,
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return <div>
    <Title title={"새로운 글"} color="green"/>
    <div>
      <TextField
        label="제목"
        placeholder="제목을 입력해주세요."
        inputType="text"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <CKEditorComponent onChange={(data) => {setContent(data)}}/>
    </div>
  </div>
}

export default NewPostPage;