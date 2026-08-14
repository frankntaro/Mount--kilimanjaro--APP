import React from 'react';
import { IMAGES } from '../data/images';
import { BookOpen, Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const BlogView: React.FC = () => {
  const { t } = useTranslation();
  const posts = [
    {
      id: 1,
      title: t.blog.posts.post1.title,
      category: t.blog.posts.post1.category,
      date: t.blog.posts.post1.date,
      author: t.blog.posts.post1.author,
      image: IMAGES.machame,
      summary: t.blog.posts.post1.summary
    },
    {
      id: 2,
      title: t.blog.posts.post2.title,
      category: t.blog.posts.post2.category,
      date: t.blog.posts.post2.date,
      author: t.blog.posts.post2.author,
      image: IMAGES.lemosho,
      summary: t.blog.posts.post2.summary
    },
    {
      id: 3,
      title: t.blog.posts.post3.title,
      category: t.blog.posts.post3.category,
      date: t.blog.posts.post3.date,
      author: t.blog.posts.post3.author,
      image: IMAGES.northernCircuit,
      summary: t.blog.posts.post3.summary
    }
  ];

  return (
    <div className="py-6 sm:py-10 md:py-14 bg-slate-50 space-y-6 sm:space-y-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Navigation Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-2xs min-h-[36px]"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>{t.common.back}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 px-2">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {t.blog.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-outfit uppercase leading-tight">
            {t.blog.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.blog.pageSubtitle}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-emerald-800 text-white text-[9px] sm:text-[10px] font-black uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{post.author}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-outfit uppercase leading-snug hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 pt-0">
                <button className="text-xs font-black text-emerald-800 hover:text-emerald-900 uppercase flex items-center gap-1 py-1.5 min-h-[36px]">
                  <span>{t.blog.readFullGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
