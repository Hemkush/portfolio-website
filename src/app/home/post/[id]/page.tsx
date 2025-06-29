import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/Posts/Post";

export default function Page({ params }: { params: { id: string } }) {
    const post = posts.find((post) => post.id === params.id);
    console.log(params.id, post);
    return (
        <div>
            <h1>Post</h1>
            {post ? <Post {...post} /> : <p>Post not found.</p>}
        </div>
    );
}
