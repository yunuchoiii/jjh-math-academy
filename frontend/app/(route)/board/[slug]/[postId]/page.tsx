import NoticeBadge from "@/app/_components/Badge/NoticeBadge";
import BackButton from "@/app/_components/Button/BackButton";
import Title from "@/app/_components/Title/Title";
import { boardService, BoardSlugEnum } from "@/app/_service/board";
import { IPost, postService } from "@/app/_service/post";
import { formatDate } from "@/app/_utils";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string;
    postId: string;
  }
}

const PostHeader = ({ post }: { post: IPost }) => (
  <div className="flex flex-col gap-1.5 lg:gap-3 px-2.5 pb-3 lg:pb-5">
    {post.isNotice && <div className="mb-1.5 block lg:hidden w-fit"><NoticeBadge /></div>}
    <div className="flex items-center">
      {post.isNotice && <div className="mr-3 hidden lg:block"><NoticeBadge /></div>}
      <h1 className="text-xl font-bold NanumSquare flex-1">{post.title}</h1>
    </div>
    <div className="flex items-center gap-2 text-sm text-[#999999]">
      <span>{formatDate(post.createdAt)}</span>
      <span>조회 {post.views}</span>
    </div>
  </div>
);

const PostContent = ({ content }: { content: string }) => (
  <div className="px-2.5 py-10 lg:py-20 border-t border-b border-[#CCCCCC]">
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

const PostPage = async ({ params }: PostPageProps) => {
  const { slug, postId } = params;

  // 게시판 정보 조회
  const board = await boardService.getBoardInfoBySlug(slug as BoardSlugEnum);
  // 게시글 조회
  const post = await postService.getPost(Number(postId));

  // 조회수 증가
  await postService.updateViewCount(Number(postId));

  return (
    <div>
      <Link href={`/board/${slug}`}>
        <Title title={board.name} color="green" />
      </Link>
      <section>
        <PostHeader post={post} />
        <PostContent content={post.content} />
        <div className="flex justify-center pt-5 lg:pt-10">
          <BackButton text="목록" hideIcon/>
        </div>
      </section>
    </div>
  );
}

export default PostPage;