import { postService } from "@/app/_service/post";

interface PostPageProps {
  params: {
    slug: string;
    postId: string;
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug, postId } = params;

  const post = await postService.getPost(Number(postId));
  console.log(post);

  return <div>
    <h1>Post Page</h1>
  </div>
}

export default PostPage;