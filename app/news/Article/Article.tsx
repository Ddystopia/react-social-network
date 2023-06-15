import React, { FC } from 'react';
import { Article } from '@/redux/newsReducer';
// import classNames from './Article.module.css'

export const ArticleComponent: FC<Props> = ({ data, refTo }) => {
  const content = data.content || data.description;
  return (
    <article ref={refTo}>
      <h3>{data.title}</h3>
      {data.urlToImage && <img alt={data.title} src={data.urlToImage} />}
      <p>
        {content.replace(/\[\+\d+\s\w+]$/, '')}
        <a href={data.url} area-label="to source">
          {content.match(/\[\+\d+\s\w+]$/)?.[0] || 'go to source'}
        </a>
      </p>
      <div>
        <span>Author: {data.author}</span>
        <span>Published at: {new Date(data.publishedAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
};

type Props = {
  data: Article;
  refTo: ((node: HTMLDivElement) => void) | null;
};
