import Link from "next/link"
import { Section } from '../about/section';
import Post from '@/app/ui/components/Posts/Post';
import { getPosts } from '@/app/lib/data';

export default async function Page() {
  const posts = await getPosts();
  return (

    <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-6">
                <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">Thoughts & Writings</h1>
                <p className="mt-2 text-lg text-gray-400">Sharing insights on technology, design, and development.</p>
            </header>

            <Section title="Latest Posts">
                <div className="flex justify-end mb-6">
                    <Link href="/home/post/insert">
                    <button className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Post New Blog
                    </button>
                    </Link>
                </div>
                <div className="space-y-8">
                     {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          author={post.author}
        />
      ))}
                </div>
            </Section>
        </div>
    )
};
