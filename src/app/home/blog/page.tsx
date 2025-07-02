import Link from "next/link"

import { Button } from "@/app/ui/components/button"
// import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/Posts/Post';
import { getPosts } from '@/app/lib/data';
// import { auth } from "../../../../auth.config"

export default async function Page() {
  const posts = await getPosts();
//   const session = await auth()
  return (
    <div className="bg-gray-100 p-4">
      
      {/* {session?.user &&  */}
      <Link href="/home/post/insert"><Button className="outline outline-1  border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white my-5 py-2 px-4 rounded">New +</Button></Link>
      {/* } */}
      <h1>Posts</h1>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
        />
      ))}
    </div>
    )
};
