import { IPost } from "@/app/_service/post";
import { IUser } from "@/app/_service/user";
import { formatDate } from "@/app/_utils";
import Link from "next/link";
import NoticeBadge from "../Badge/NoticeBadge";

interface PostHeaderProps {
  post: IPost;
  user: IUser | null;
  deletePost: () => Promise<void>;
}

const PostHeader = ({ post, user, deletePost }: PostHeaderProps) => (
  <div className="flex flex-col gap-1.5 lg:gap-3 px-2.5 pb-3 lg:pb-5">
    {post.isNotice && <div className="mb-1.5 block lg:hidden w-fit"><NoticeBadge /></div>}
    <div className="flex items-center">
      {post.isNotice && <div className="mr-3 hidden lg:block"><NoticeBadge /></div>}
      <h1 className="text-xl font-bold NanumSquare flex-1">{post.title}</h1>
    </div>
    <div className="flex items-center gap-2 text-sm text-[#999999]">
      <span>{formatDate(post.createdAt)}</span>
      <span>조회 {post.views}</span>
      {user?.userId === post.authorId && (
        <>
          <Link href={`/post/${post.id}/edit`}>
            <span className="hover:underline text-green-1">수정</span>
          </Link>
          <button className="hover:underline text-green-1" onClick={deletePost}>삭제</button>
        </>
      )}
    </div>
  </div>
);

export default PostHeader;