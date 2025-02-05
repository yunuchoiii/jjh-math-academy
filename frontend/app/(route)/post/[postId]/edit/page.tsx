"use client";

import PostEditForm from "@/app/_components/Post/PostEditForm";
import Title from "@/app/_components/Title/Title";
import { attachmentService, IAttachment } from "@/app/_service/attachment";
import { boardService, BoardSlugEnum, IBoard } from "@/app/_service/board";
import { IPost, postService } from "@/app/_service/post";
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
}

const EditPostPage = ({ params }: EditPostPageProps) => {
  const postId = Number(params.postId);

  const [post, setPost] = useState<IPost | null>(null);
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [files, setFiles] = useState<IAttachment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(postId);
        setPost(res);
        fetchFiles(res.attachmentGroupId);
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

    fetchBoardList();
    if (postId) {
      fetchPost();
    }
  }, []);

  return <Container>
    <Title title={"새로운 글"} color="green"/>
    <PostEditForm 
      boardList={boardList} 
      post={post}
      initialFiles={files} 
    />
  </Container>
}

export default EditPostPage;