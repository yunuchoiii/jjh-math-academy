import NoticeBadge from "@/app/_components/Badge/NoticeBadge";
import ReactiveButton from "@/app/_components/Button/ReactiveButton";
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

const BackButton = ({ slug }: { slug: string }) => (
  <div className="flex justify-center pt-5 lg:pt-10">
    <ReactiveButton>
      <Link href={`/board/${slug}`}>
        <div className="bg-[#E9E9E9] px-5 py-2 rounded-md font-bold">목록</div>
      </Link>
    </ReactiveButton>
  </div>
);

const PostPage = async ({ params }: PostPageProps) => {
  const { slug, postId } = params;

  const board = await boardService.getBoardInfoBySlug(slug as BoardSlugEnum);
  const post = await postService.getPost(Number(postId));

  return (
    <div>
      <Title title={board.name} color="green" />
      <section>
        <PostHeader post={post} />
        <PostContent content={post.content} />
        <BackButton slug={slug} />
      </section>
    </div>
  );
}

export default PostPage;