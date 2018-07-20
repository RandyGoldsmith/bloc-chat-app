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

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		
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
	this.setState({ newRoomName: ''});
}



handleChange(e) {
	this.setState({newRoomName: e.target.value});
	e.preventDefault();
}

handleSubmit(e) {
	e.preventDefault();
	console.log('Form value: ' + this.state.newRoomName);
	
}

handleClick(e) {
	console.log('click happened');
	
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
							<h2 key={index}>{console.log(room.name)}</h2>
						)
					}
					</div>
					<div className="room-form">
					<form onSubmit={this.handleSubmit}>
						<label>
							Name:
							<input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e)} />
						</label>
						<button onClick={this.handleClick} type="submit">New Room</button>	
					</form>
					</div>
				</aside>
			</div>	
		</div>
		)
	}
}

export default RoomList;

