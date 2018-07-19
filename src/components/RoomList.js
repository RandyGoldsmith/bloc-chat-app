import React, { Component } from 'react';
import './RoomList.css';


class RoomList extends Component {
	constructor(props) {
		super(props);

		this.roomsRef = this.props.firebase.database().ref('rooms');

		this.state = {
			rooms: []
		};
		
	}

	


componentDidMount() {
	this.roomsRef.on('child_added', snapshot => {
		const room = snapshot.val();
		room.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.concat( room )});
	});
}


	render() {
		return (
		<div>
			<div className="container">
				<aside className="left-side">
					<h1>Bloc Chat</h1>
			
					<div className="chatroom-list">
					{
						this.state.rooms.map( (room, index ) =>
							<h2 key={index}>{room.room}</h2>
						)
					}
					</div>
				</aside>
			</div>	
		</div>
		)
	}
}

export default RoomList;

