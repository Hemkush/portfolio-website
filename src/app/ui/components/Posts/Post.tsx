'use client';
// import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {  deletePosts } from '@/app/lib/data';

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);
export default function Component({ id, title, content, date, author }: { id: string, title: string, content: string, date: string, author?: string }) {
  // const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter()
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's main click event
   deletePosts(id);
   console.log(id);
   router.push('/home/blog');
  };
  
    return (
        <div key={id} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10 cursor-pointer group">
          <button
        onClick={handleDeleteClick}
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-gray-700/50 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/20 hover:text-red-400 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Delete post"
        title="Delete Post"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <div className="flex flex-col gap-3">
        {/* Card Header */}
        <div>
          <p className="text-sm text-gray-400">{date}</p>
          <Link href={`/home/post/${id}`}>
          <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
       </Link>
        </div>

        {/* Snippet */}
        {/* <p className={`text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>{content}</p> */}
        <p className={`text-gray-300 leading-relaxed`}>{content}</p>
        <button
          // onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm mt-2 transition-colors display: contents"
          // aria-expanded={isExpanded}
        >
          {/* {isExpanded ? 'Read Less' : 'Read More'} */}
        </button>

        {/* Tags Section */}
        <div className="pt-3 flex flex-wrap gap-2">
          <span className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full cursor-default">
            -{author}
          </span>
        </div>
      </div>
    </div>
    );
}

