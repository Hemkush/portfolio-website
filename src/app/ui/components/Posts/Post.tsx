'use client';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';

export default function Component({ id, title, content, date, author }: { id: string, title: string, content: string, date: string, author?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div key={id} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/10 cursor-pointer group">
      <div className="flex flex-col gap-3">
        {/* Card Header */}
        <div>
          <p className="text-sm text-gray-400">{date}</p>
          <Link href={`/home/post/${id}`}>
          <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
       </Link>
        </div>

        {/* Snippet */}
        <p className={`text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>{content}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm mt-2 transition-colors display: contents"
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
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

