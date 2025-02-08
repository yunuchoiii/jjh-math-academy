import BackButton from "@/app/_components/Button/BackButton";
import PostContents from "@/app/_components/Post/PostContents";
import PostHeader from "@/app/_components/Post/PostHeader";
import Title from "@/app/_components/Title/Title";
import { attachmentService } from "@/app/_service/attachment";
import { boardService } from "@/app/_service/board";
import { postService } from "@/app/_service/post";
import Head from 'next/head';
import Link from "next/link";

interface PostPageProps {
  params: {
    postId: string;
  }
  searchParams: {
    slug: string;
    page: string;
  }
}

const PostPage = async ({ params, searchParams }: PostPageProps) => {
  const postId = Number(params.postId);

  const post = await postService.getPost(postId);
  const board = await boardService.getBoardInfoById(post.boardId);
  const attachments = post.attachmentGroupId ? await attachmentService.getAttachmentGroup(post.attachmentGroupId) : [];

  await postService.updateViewCount(postId);

  const backButtonLink = `/board/${searchParams.slug || board?.slug}?page=${searchParams.page || 1}`;

  return (
    <div>
      <Head>
        <title>{post.title} - {board.name}</title>
        <meta name="keywords" content={`조재현 수학, 조재현 수학학원, 조재현 수학학원 게시판, ${board.name}, ${post.title}`} />
      </Head>
      <Link href={`/board/${board.slug}`}>
        <Title title={board.name} color="green" />
      </Link>
      <article>
        <PostHeader
          post={post} 
          slug={board.slug}
          page={Number(searchParams.page || 1)}
        />
        <PostContents 
          content={post.content} 
          attachments={attachments} 
        />
        <div className="flex justify-center pt-5 lg:pt-10">
          <BackButton 
            text="목록" 
            link={backButtonLink}
            hideIcon 
          />
        </div>
      </article>
    </div>
  );
}

export default PostPage;