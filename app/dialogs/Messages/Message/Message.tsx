import React, { useState, useEffect, FC, useRef } from 'react'
import classNames from './Message.module.css'
import CMClassNames from './ContextMenu.module.css'
import standardAvatar from '@/public/images/standardAvatar.jpg'
import { MessageData } from '@/redux/dialogReducer';

export const Message: FC<Props> =
  ({ data, smallPhoto, classEnd, removeMessage, restoreMessage }) => {
    const date = calcDate(data.addedAt)
    const messageClassName = getClassName('message', classEnd)
    const dateClassName = getClassName('date', classEnd)
    const viewedClassName = getClassName('viewed', classEnd)

    const contextMenuRef = useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = useState(true)
    let buttonPressTimer: NodeJS.Timeout;

    type ContextMenuEvent = React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>

    const openContextMenu = (e: ContextMenuEvent) => {
      e.preventDefault();
      setHidden(false);
      const contextMenu = contextMenuRef.current;
      if (contextMenu) {
        if ('touches' in e) {
          contextMenu.style.left = e.touches[0].clientX + 'px';
          contextMenu.style.top = e.touches[0].clientY + 'px';
        } else {
          contextMenu.style.left = e.clientX + 'px';
          contextMenu.style.top = e.clientY + 'px';
        }
      }
    };

    useEffect(() => {
      hidden || contextMenuRef.current?.focus()
    })

    const handleButtonPress = (e: ContextMenuEvent) => {
      buttonPressTimer = setTimeout(() => openContextMenu(e), 1500)
    }

    const handleButtonRelease = () => {
      clearTimeout(buttonPressTimer)
    }

    return (
      <article className={messageClassName}>
        <img alt="avatar" src={smallPhoto || standardAvatar.src} />
        <div
          className={classNames.content}
          onContextMenu={openContextMenu as any}
          onTouchStart={handleButtonPress as any}
          onTouchEnd={handleButtonRelease}
        >
          <p>{data.body}</p>
          <div className={dateClassName}>{date}</div>
          {data.viewed && <div className={viewedClassName}>👁</div>}
        </div>
        <div
          className={CMClassNames.contextMenu}
          ref={contextMenuRef}
          onBlur={() => setHidden(true)}
          hidden={hidden}
          tabIndex={-1}
        >
          <ul>
            {data.deletedBySender ? (
              <li onClick={() => restoreMessage(data)}>Restore self</li>
            ) : (
              <li onClick={() => removeMessage(data)}>Remove self</li>
            )}
            <li>{data.viewed ? 'Viewed' : 'Not viewed'}</li>
          </ul>
        </div>
      </article>
    )
  }

const getClassName = (regularClassName: string, classEnd: string) => {
  return `${classNames[regularClassName + classEnd]} ${classNames[regularClassName]}`
}

const calcDate = (date: Date): string => {
  const thisDate = new Date();

  const formatTimePart = (value: number): string =>
    value < 10 ? `0${value}` : `${value}`;

  const year = formatTimePart(date.getFullYear());
  const month = formatTimePart(date.getMonth() + 1);
  const day = formatTimePart(date.getDate());
  const hour = formatTimePart(date.getHours());
  const minute = formatTimePart(date.getMinutes());

  // Calculate if the date is yesterday or older
  const isYesterday = thisDate.getDate() !== parseInt(day) &&
    thisDate.getTime() - date.getTime() < 1 * 24 * 3600 * 1000;

  const datePart = isYesterday
    ? 'Yesterday'
    : `${year}-${month}-${day}`;

  return `${datePart} / ${hour}:${minute}`;
}

type Props = {
  data: MessageData;
  smallPhoto?: string;
  classEnd: string;
  removeMessage: (message: MessageData) => void;
  restoreMessage: (message: MessageData) => void;
}

