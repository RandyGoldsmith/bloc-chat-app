import React, { Component } from 'react';
import './RoomList.css';


class RoomList extends Component {
	constructor(props) {
		super(props);

		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.state = {
			rooms: [],
			newRoomName: ''
		};
		
	}

	


componentDidMount() {
	this.roomsRef.on('child_added', snapshot => {
		const room = snapshot.val();
		room.key = snapshot.key;
		this.setState({ rooms: this.state.rooms.concat( room )});
	});
}

createRoom(newRoomName) {
	this.roomsRef.push({
		name: newRoomName
	});
	this.setState({ newRoomName: newRoomName});
}



handleChange(e) {
	this.setState({newRoomName: e.target.value});
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
					<form onSubmit={this.createRoom(this.state.newRoomName) }>
						<label>
							Name:
							<input type="text" value={this.state.newRoomName} onChange={this.handleChange.bind(this)} />
						</label>
						<button type="submit">New Room</button>	
					</form>
				</aside>
			</div>	
		</div>
		)
	}
}

export default RoomList;

