
import React from 'react';
import { Post } from '../types';

const POSTS: Post[] = [
  {
    id: '1',
    author: '科技前沿',
    avatar: 'https://picsum.photos/seed/tech/100',
    content: '今天 Gemini 3 发布了！AI的发展速度真是令人惊叹 🚀',
    images: ['https://picsum.photos/seed/ai1/800/400'],
    timestamp: '2小时前',
    likes: 42,
    comments: 12
  },
  {
    id: '2',
    author: '旅行达人',
    avatar: 'https://picsum.photos/seed/travel/100',
    content: '这里的风景美得不真实，大自然是最好的画师。🌿🏔️',
    images: ['https://picsum.photos/seed/nature1/400/400', 'https://picsum.photos/seed/nature2/400/400'],
    timestamp: '5小时前',
    likes: 128,
    comments: 34
  }
];

const DiscoverView: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Cover */}
      <div className="relative h-64 w-full">
        <img 
          src="https://picsum.photos/seed/cover/800/600" 
          className="w-full h-48 object-cover" 
          alt="cover" 
        />
        <div className="absolute top-36 right-4 flex items-center space-x-3">
          <span className="text-white font-medium text-lg drop-shadow-md">My Name</span>
          <img 
            src="https://picsum.photos/seed/me/100" 
            className="w-16 h-16 rounded-lg border-2 border-white shadow-md object-cover" 
            alt="me" 
          />
        </div>
      </div>

      {/* Feed */}
      <div className="mt-8 space-y-6 pb-20">
        {POSTS.map((post) => (
          <div key={post.id} className="flex px-4 py-2 border-b border-gray-100 last:border-0">
            <img src={post.avatar} className="w-10 h-10 rounded-md shrink-0 object-cover" alt="avatar" />
            <div className="ml-3 flex-1">
              <h4 className="text-blue-900 font-medium text-sm">{post.author}</h4>
              <p className="text-gray-800 text-sm mt-1 leading-relaxed">{post.content}</p>
              
              {post.images.length > 0 && (
                <div className={`mt-2 grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {post.images.map((img, idx) => (
                    <img key={idx} src={img} className="rounded-sm w-full max-h-60 object-cover" alt="post content" />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-3 mb-1">
                <span className="text-xs text-gray-400">{post.timestamp}</span>
                <div className="bg-gray-100 p-1 px-2 rounded-sm cursor-pointer active:bg-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
                    <div className="w-1 h-1 bg-blue-900 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverView;
