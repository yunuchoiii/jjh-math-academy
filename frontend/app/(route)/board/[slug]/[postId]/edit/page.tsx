"use client";

import PostEditForm from "@/app/_components/Post/PostEditForm";
import Title from "@/app/_components/Title/Title";
import useUser from "@/app/_hooks/useUser";
import { attachmentService, IAttachment } from "@/app/_service/attachment";
import { boardService, BoardSlugEnum, IBoard } from "@/app/_service/board";
import { IPost, postService } from "@/app/_service/post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  & .Select-container, .TextField-container, .Toggle-container {
    margin-bottom: 0px;
  }
  & .TextField-input, .Select-button {
    box-shadow: none;
    border: 1px solid #DDD;
  }
`
interface EditPostPageProps {
  params: {
    postId: string;
  }
  searchParams: {
    boardId: string;
  }
}

const EditPostPage = ({ params, searchParams }: EditPostPageProps) => {
  const {isLoggedIn} = useUser();
  const router = useRouter();

  const postId = Number(params.postId);
  const boardId = Number(searchParams.boardId);

  const [post, setPost] = useState<IPost | null>(null);
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [files, setFiles] = useState<IAttachment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(postId);
        setPost(res);
        if (res.attachmentGroupId) {
          fetchFiles(res.attachmentGroupId);
        }
      } catch (error) {
        console.error(error);
      }
    }

    const fetchBoardList = async () => {
      try {
        const res = await boardService.getBoardList();
        setBoardList(res.filter(board => board.slug !== BoardSlugEnum.ALL));
      } catch (error) {
        console.error(error);
      }
    }

    const fetchFiles = async (attachmentGroupId: number) => {
      try {
        const res = await attachmentService.getAttachmentGroup(attachmentGroupId);
        setFiles(res);
      } catch (error) {
        console.error(error);
      }
    }
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      fetchBoardList();
      if (postId) {
        fetchPost();
      }
    }
  }, [isLoggedIn, postId]);

  return <Container>
    <Title title={"새로운 글"} color="green"/>
    <PostEditForm 
      boardList={boardList} 
      post={post}
      initialFiles={files} 
      initialBoardId={boardId}
    />
  </Container>
}

export default EditPostPage;