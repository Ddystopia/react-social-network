import React from "react"
import Dialogs from "./Dialogs"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux"

class DialogsContainer extends React.Component{
	render(){
		return <Dialogs />
	}
}

export default compose(withAuthRedirect)(DialogsContainer)