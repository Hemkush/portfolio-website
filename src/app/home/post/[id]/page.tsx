
import Post from "@/app/ui/components/Posts/Post";
import { getPosts } from '@/app/lib/data';
import { Section } from "../../about/section";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const posts = await getPosts();
    // console.log("Resolved Params:", resolvedParams);
    // console.log("Posts:", posts);
    const post = posts?.find((post) => post.id === resolvedParams.id);
    
    return (
        <div className="container mx-auto px-4 md:px-8 pb-16">
        <header className="text-center py-8">
            <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">Blog Post</h1>
            <p className="mt-2 text-lg text-gray-400">Read the latest insights and updates.</p>
        </header>
        <Section title="Post Details"> 
            {post ? <Post key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          author={post.author}
           /> : <p>Post not found.</p>}
           </Section>
        </div>
    );
}
