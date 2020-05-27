import React from 'react'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { sendMessage } from '../../redux/dialogReducer'
import { getChatsData, getMessagesData } from '../../redux/selectors/selectors'

const DialogsContainer = ({ chatsData, messagesData, sendMessage }) => {
  return <Dialogs chatsData={chatsData} messagesData={messagesData} sendMessage={sendMessage} />
}

const mapStateToProps = (state) => ({
  chatsData: getChatsData(state),
  messagesData: getMessagesData(state),
})

export default compose(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect
)(DialogsContainer)
