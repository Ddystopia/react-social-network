import React, { FC, useEffect, useRef } from 'react';
import { Message } from './Message/Message';
import classNames from './Messages.module.css';
import { SendForm } from './SendForm/SendForm';
import empty from '@/public/images/mailbox-empty.svg';
import { Preloader } from '@/components/common/Preloader/Preloader';
import { MessageData } from '@/redux/dialogReducer';
import { Profile } from '@/redux/profileReducer';
import { ChatData } from '../Chats/Chats';

interface MessagesContainerProps {
  data: MessageData[];
  isBin?: boolean;
  profile: Profile | null;
  secondProfile: Profile | null;
  isFetching: boolean;
  chatsData: ChatData[];
  currentDialogId: number | null;
  lastCheck: Date;

  messageActions: {
    getNewMessages: (userId: number, lastCheck: Date) => void;
    sendMessage: (message: string) => void;
    removeMessage: (message: MessageData) => void;
    restoreMessage: (message: MessageData) => void;
  };
}

export const Messages: FC<MessagesContainerProps> = ({
  data,
  messageActions,
  profile,
  secondProfile,
  isFetching,
  isBin,
  chatsData,
  currentDialogId,
  lastCheck,
}) => {
  const { sendMessage, removeMessage, restoreMessage, getNewMessages } = messageActions;

  const haveChats = currentDialogId != null;

  useEffect(() => {
    const chat = chatsData.find((item: ChatData) => item.id === currentDialogId);
    if (chat && chat.newMessagesCount > 0) {
      getNewMessages(chat.id, lastCheck);
    }
  }, [chatsData, currentDialogId, getNewMessages, lastCheck]);

  useEffect(() => {
    const element = messagesDiv.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  });
  const messagesDiv = useRef<HTMLDivElement>(null);
  const messages = data
    .filter((item) => isBin === !!item.deletedBySender)
    .map((item) => ({ ...item, addedAt: item.addedAt }))
    .sort((a, b) => a.addedAt.localeCompare(b.addedAt))
    .slice(0, Math.min(data.length, 100))
    .map((item) => {
      const is_self = profile?.userId === item.senderId;
      const p = is_self ? profile : secondProfile;
      const photo = p?.photos.small;
      return (
        <Message
          key={item.id}
          data={item}
          classEnd={is_self ? 'Self' : 'Else'}
          smallPhoto={photo}
          removeMessage={removeMessage}
          restoreMessage={restoreMessage}
        />
      );
    });

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <section className={classNames.content}>
      <div ref={messagesDiv} className={classNames.messages}>
        {messages.length ? (
          messages
        ) : (
          <div className={classNames.empty}>
            <img alt="Empty" src={empty.src} />
            <p>Empty</p>
          </div>
        )}
      </div>
      {haveChats && profile != null && (
        <SendForm sendMessage={(message: string) => sendMessage(message)} />
      )}
    </section>
  );
};
