import React from 'react';
import Link from 'next/link';

interface ListItemProps {
  text: string;
  to: string;
  className: string | null;
}

const ListItem: React.FC<ListItemProps> = ({ text, to, className }) => {
  const name = className != null ? className : '';

  return (
    <li className={name}>
      <Link href={to}> {text} </Link>
    </li>
  );
};

export default ListItem;
