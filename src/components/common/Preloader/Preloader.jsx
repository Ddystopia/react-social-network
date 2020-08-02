import React from 'react'
import classNames from './Preloader.module.css'
import preloader from '../../../assets/images/preloader.svg'

export const Preloader = () => (
  <div className={classNames.container}>
    <img src={preloader} alt="preloader" />
  </div>
)
