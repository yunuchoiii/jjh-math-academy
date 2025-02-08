import { LOGO_GREEN_SRC } from "@/app/_constants/constants";
import { BoardSlugEnum } from "@/app/_service/board";
import { IPost } from "@/app/_service/post";
import { formatDateTime } from "@/app/_utils";
import Link from "next/link";

interface PostCardProps {
  slug: BoardSlugEnum;
  post: IPost;
}

const parseHTMLToText = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const PostCard = ({ slug, post }: PostCardProps) => {
  return (
    <Link
      href={`/board/${slug}/${post.id}?page=1`} 
      className="relative w-full h-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)] md:hover:shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] bottom-0 md:hover:bottom-2.5 active:scale-95 md:active:scale-100 transition-all duration-300 p-[15px] rounded-[30px]"
    >
      <div className="w-full aspect-[5/4] object-cover rounded-[15px] mb-4 overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-full object-cover" 
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = LOGO_GREEN_SRC;
            e.currentTarget.style.objectFit = "contain";
            e.currentTarget.style.objectPosition = "center";
            e.currentTarget.style.scale = "70%";
          }}
        />
      </div>
      <div className="flex flex-col gap-2 px-0.5">
        <h3 className="font-bold ellipsis">{post.title}</h3>
        <p className="text-sm text-gray-5 ellipsis-3">
          {parseHTMLToText(post.content)}
        </p>
        <p className="text-xs text-[#888] text-right mr-1.5">
          {formatDateTime(post.createdAt, "-")}
        </p>
      </div>
    </Link>

  );
};

export default PostCard;