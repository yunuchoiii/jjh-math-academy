"use client";

import PostEditForm from "@/app/_components/Post/PostEditForm";
import Title from "@/app/_components/Title/Title";
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
  const postId = params.postId;

  const [post, setPost] = useState<IPost | null>(null);
  const [boardList, setBoardList] = useState<IBoard[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postService.getPost(Number(postId));
        setPost(res);
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

    fetchBoardList();
    console.log((postId));
    if (Number(postId)) {
      fetchPost();
    }
  }, []);

  return <Container>
    <Title title={"새로운 글"} color="green"/>
    <PostEditForm boardList={boardList} post={post}/>
  </Container>
}

export default EditPostPage;