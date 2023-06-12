import React from 'react'
import Link from 'next/link'
import { Option } from '@sniptt/monads';

interface ListItemProps {
  text: string
  to: string
  className: Option<string>
}

const ListItem: React.FC<ListItemProps> = ({ text, to, className }) => {
  
  return (
    <li className={className.unwrapOr("")}>
      <Link href={to}> {text} </Link>
    </li>
  )
}

export default ListItem

