//
// React dependencies
//
import React from 'react';
import { useArticleContentLogic } from '@principal/infrastructure/ui/Components/Experiences/UseArticleContentLogic';

interface ArticleContentProps {
  title: string;
  timeline: string;
  description: string;
  datetime: string;
  companyImage: string;
  url?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  title,
  timeline,
  description,
  datetime,
  companyImage,
  url,
}) => {
  //
  // React components
  //
  const { isIntersecting, articleRef } = useArticleContentLogic();

  //
  // Computed
  //
  const companyPhotoInfo = (): React.JSX.Element => {
    return (
      <div className={'flex flex-row gap-2 items-center'}>
        <figure className={'h-10 w-10 bg-white rounded-full'}>
          <img
            className="inline-block h-full w-full object-contain rounded-full"
            src={companyImage}
            alt={'article-image-' + title}
          />
        </figure>
        <span className="ml-4 relative z-10">{title}</span>
      </div>
    );
  };

  return (
    <article
      ref={articleRef}
      className={`${isIntersecting ? 'animate-fade-right animate-ease-in' : ''} md:grid md:grid-cols-4 md:items-baseline`}
    >
      <div className="md:col-span-3 group relative flex flex-col items-start">
        <h2 className="text-base font-semibold tracking-tight text-zinc-100">
          <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl bg-zinc-800/50" />
          {(url && (
            <a aria-label={'company-url-' + title} href={url} target={'_blank'} rel="noreferrer">
              <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
              {companyPhotoInfo()}
            </a>
          )) || (
            <>
              <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
              {companyPhotoInfo()}
            </>
          )}
        </h2>
        <time
          className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 pl-3.5"
          dateTime={datetime}
        >
          <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
            <span className="h-4 w-0.5 rounded-full bg-zinc-500" />
          </span>
          {timeline}
        </time>
        <p className="relative z-10 mt-2 text-sm text-zinc-400">{description}</p>
        {url && (
          <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
          >
            Company website
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="ml-1 h-4 w-4 stroke-current"
            >
              <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <time
        className="mt-1 sm:hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400"
        dateTime={datetime}
      >
        {timeline}
      </time>
    </article>
  );
};

export default ArticleContent;
