import React, { Component }from 'react';
import { Link } from 'react-router-dom';


class RoomList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rooms: []
		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
	}




componentDidMount() {
	this.roomsRef.on('child_added', snapshot => {
		console.log(snapshot);
	});
}


	render() {
		return (
			<h1>Bloc Chat</h1>
		)
	}
}

export default RoomList;
