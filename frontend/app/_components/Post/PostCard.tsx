import { LOGO_GREEN_SRC } from "@/app/_constants/constants";
import { BoardSlugEnum } from "@/app/_service/board";
import { IPost } from "@/app/_service/post";
import { formatDateTime } from "@/app/_utils";
import Link from "next/link";

interface PostCardProps {
  slug: BoardSlugEnum;
  post: IPost;
}

const PostCard = ({ slug, post }: PostCardProps) => {
  return (
    <Link
      href={`/board/${slug}/${post.id}?page=1`} 
      className="group relative flex flex-col w-full h-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)] md:hover:shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] bottom-0 md:hover:bottom-2.5 active:scale-95 md:active:scale-100 transition-all duration-300 p-[15px] rounded-[30px]"
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
      <div className="flex-1 flex flex-col gap-2 px-0.5">
        <h3 className="font-bold ellipsis-2 flex-1">{post.title}</h3>
        <div className="flex justify-between items-center pr-1">
          <p className="text-xs text-[#888]">
            {formatDateTime(post.createdAt, "-")}
          </p>
          <i className={"hidden md:block fas fa-arrow-right relative opacity-0 -left-2.5 md:group-hover:opacity-100 md:group-hover:left-0 transition-all duration-300 text-[#666]"}></i>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;