"use client";

import Button from "@/app/_components/Button/Button";
import CKEditorComponent from "@/app/_components/CKEditor/CKEditor";
import Select from "@/app/_components/Input/Select";
import TextField from "@/app/_components/Input/TextField";
import Toggle from "@/app/_components/Input/Toggle";
import Title from "@/app/_components/Title/Title";
import { useToast } from "@/app/_components/Toast/ToastProvider";
import useUser from "@/app/_hooks/useUser";
import { boardService, IBoard } from "@/app/_service/board";
import { postService } from "@/app/_service/post";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface NewPostPageProps {
  searchParams: {
    boardId: string;
  }
}

const Container = styled.div`
  & .Select-container, .TextField-container, .Toggle-container {
    margin-bottom: 0px;
  }
  & .TextField-input, .Select-button {
    box-shadow: none;
    border: 1px solid #DDD;
  }
`

const NewPostPage = ({ searchParams }: NewPostPageProps) => {
  const { boardId:defaultBoardId } = searchParams;
  const router = useRouter();
  const { user, isLoggedIn, isLoading, userInfoByType } = useUser();
  const { addToast } = useToast();

  const [boardList, setBoardList] = useState<IBoard[]>([]);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const res = await boardService.getBoardList();
        setBoardList(res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBoardList();
  }, []);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isNotice, setIsNotice] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<number>(Number(defaultBoardId));

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "" || content === "") {
      addToast({
        type: "error",
        message: "제목과 내용을 입력해주세요."
      })
      return;
    }
    if (!boardList.map(board => board.id).includes(Number(boardId))) {
      addToast({
        type: "error",
        message: "게시판을 선택해주세요."
      })
      return;
    }
  
    try {
      await postService.createPost({
        callback: () => {
          addToast({
            type: "success",
            message: "게시글이 등록되었습니다."
          })
          router.push(`/board/${boardList.find(board => board.id === Number(boardId))?.slug}`);
        },
        errorCallback: (error:AxiosError) => {
          addToast({
            type: "error",
            message: "게시글 등록에 실패하였습니다."
          })
          console.error(error);
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

  return <Container>
    <Title title={"새로운 글"} color="green"/>
    <form className="grid grid-cols-2 gap-4" onSubmit={createPost}>
      <div className="col-span-1">
        <Select
          label="게시판"
          options={boardList.map((board) => ({ value: board.id, label: board.name }))}
          value={boardId}
          onChange={(value) => {setBoardId(value)}}
          position="horizontal"
        />
      </div>
      <div className="col-span-1 w-fit">
        <Toggle
          label="공지"
          checked={isNotice}
          onChange={(checked) => {setIsNotice(checked)}}
        />
      </div>
      <div className="col-span-2">
        <TextField
          label="제목"
          placeholder="제목을 입력해주세요."
          inputType="text"
          value={title}
          onChange={(value) => setTitle(value)}
        />
      </div>
      <div className="col-span-2">
        <CKEditorComponent onChange={(data) => {setContent(data)}}/>
      </div>
      <div className="col-span-2 flex justify-center">
        <Button type="submit" color="green">게시글 작성</Button>
      </div>
    </form>
  </Container>
}

export default NewPostPage;