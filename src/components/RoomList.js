import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './RoomList.css';


class RoomList extends Component {
	constructor(props, context) {
		super(props, context);

		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.state = {
			rooms: [],
			newRoomName: '',
			show: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		
	}

closeModal() {
	this.setState({ show: false });
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
							<h2 key={index}>{room.name}</h2>
						)
					}
					</div>
				
				<div className="modal-container" style={{ height: 200 }}>
        			<Button
          			bsStyle="primary"
          			bsSize="small"
          			onClick={() => this.setState({ show: true })}
        			>
          				Launch contained modal
        			</Button>

        			<Modal
          			show={this.state.show}
          			onHide={this.closeModal}
          			container={this}
          			aria-labelledby="contained-modal-title"
        			>
          			<Modal.Header closeButton>
            		<Modal.Title id="contained-modal-title">
              			Create New Room
            		</Modal.Title>
          			</Modal.Header>
          			<Modal.Body>
            			Enter room name: 
          			</Modal.Body>
          			<Modal.Footer>
            			<Button onClick={this.closeModal}>Cancel</Button>
            			<Button>Create Room</Button>
          			</Modal.Footer>
        			</Modal>
      			</div>
				</aside>
			</div>	
		</div>
		)
	}
}

export default RoomList;

