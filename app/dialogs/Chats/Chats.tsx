import React, { FC, useEffect } from 'react';
import classNames from './Chats.module.css';
import { ChatListItem } from './ChatListItem/ChatListItem';
import Swal from 'sweetalert2';

export const Chats: FC<Props> = ({ data, chatActions, newMessagesCount }) => {
  const { getAllDialogs, createNewChat, getMessages, getNewMessagesCount } = chatActions;

  useEffect(() => {
    if (newMessagesCount > 0) {
      getAllDialogs();
    }
    const checkNMC = setInterval(() => getNewMessagesCount(), 10000);
    return () => clearInterval(checkNMC);
  }, [getAllDialogs, getNewMessagesCount, newMessagesCount]);

  const onNewChatClick = async () => {
    const { value: id } = await Swal.fire({
      title: 'Who to start a dialogue with?',
      text: 'Type user id',
      input: 'number',
      inputPlaceholder: '1234',
      icon: 'question',
    });

    if (+id > 0) {
      createNewChat(id);
    } else if (id) {
      Swal.fire('Invalid id', '', 'error');
    }
  };

  const listItems = data.map((item) => (
    <ChatListItem active={false} key={item.id} {...item} onClick={() => getMessages(item.id)} />
  ));

  return (
    <section className={classNames.chats}>
      <header>
        <h2>Chats</h2>{' '}
        <button className={classNames.newChat} onClick={onNewChatClick} aria-label="New chat">
          <span>+</span>
        </button>
      </header>
      <ul>{listItems}</ul>
    </section>
  );
};

type Props = {
  data: Array<ChatData>;
  chatActions: {
    getAllDialogs: () => void;
    createNewChat: (id: number) => void;
    getMessages: (id: number) => void;
    setCurrentDialogId: (id: number) => void;
    getNewMessagesCount: () => void;
  };
  newMessagesCount: number;
};

export type ChatData = {
  id: number;
  userName: string;
  newMessagesCount: number;
};
