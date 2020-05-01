import React from "react"
import Dialogs from "./Dialogs"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"

class DialogsContainer extends React.Component{
	render(){
		return <Dialogs />
	}
}

export default withAuthRedirect(DialogsContainer)