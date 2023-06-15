import React from 'react';
import classNames from './ErrorPage.module.css';

export const ErrorPage: React.FC = () => (
  <div className={classNames.container}>
    <h1>Oops...</h1>
    <p>Something went wrong...</p>
  </div>
);
