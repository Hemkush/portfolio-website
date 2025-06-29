import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/Posts/Post";

type PostType = typeof posts[number];

export default function BlogPage() {
    return (
        <div>
            <h1 className="text-gray-800 text-3xl font-bold text-center my-8">
      Blogs</h1>
            <p>                Welcome to the blog page! Here you will find the latest articles and updates.
            </p>
            {posts.map((post: PostType) => <Post key={post.id} {...post} />
            )}  
            </div>)
}
