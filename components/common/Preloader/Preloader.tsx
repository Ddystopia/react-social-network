"use client";

import React, { useEffect, useState } from 'react'
import classNames from './Preloader.module.css'

export const Preloader: React.FC = () => {
  const { container, pie, slice } = classNames;

  const t1 = `${slice} ${classNames.slice1}`;
  const t2 = `${slice} ${classNames.slice2}`;
  const t3 = `${slice} ${classNames.slice3}`;
  const t4 = `${slice} ${classNames.slice4}`;

  const [show, setShow] = useState(false);

  // If preloader is shown immediately, in cases when loading is fast, it looks bad.
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  });

  if (!show) {
    return null;
  }

  return (
    <div className={container}>
      <div className={pie}>
        <div className={t1}></div>
        <div className={t2}></div>
        <div className={t3}></div>
        <div className={t4}></div>
      </div>
    </div>
  )
}
