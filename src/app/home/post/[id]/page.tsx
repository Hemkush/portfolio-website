import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/Posts/Post";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const post = posts.find((post) => post.id === resolvedParams.id);
    return (
        <div>
            <h1>Post</h1>
            {post ? <Post {...post} /> : <p>Post not found.</p>}
        </div>
    );
}
