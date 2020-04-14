import React from 'react';
import EditUserComponent from "./EditUserComponent";

export default class UserComponent extends React.Component{
    //runs after render
    constructor(props) {
        super(props);
        this.users={}
        this.state = {
            selectOptions: null,
            selectedUser: undefined
        }
        // We've to bind every function we create
        this.selectUserChange = this.selectUserChange.bind(this);
        this.editUser = this.editUser.bind(this);
    }
    componentDidMount() {
        const url = "http://localhost:3002/users";
        fetch(url)
            .then(response => response.json())
            .then(json => this.fetchSuccess(json));
                /*error=>this.fetchError(error))
            .catch(error => this.fetchError(error));*/
    }

    fetchSuccess(jsonResult){
        this.users = jsonResult;
        const data = jsonResult.map((user) => <option key={user.id} name={user.userName} value={user.id} >{user.userName}</option> );
        this.setState({
            selectOptions: data
        })
    }
    selectUserChange(event){
        const id = parseInt(event.target.value);
        this.setState({
            selectedUser : this.users.find((user) => user.id === id) // find same id
        })
        console.log(typeof id);
    }

    editUser(event){
        const {name, value} = event.target;
        const tempSelectedUser = this.state.selectedUser;
        tempSelectedUser[name] = parseInt(value);

        this.setState({
            selectedUser: tempSelectedUser
        });

        this.changeDataOnServer()
            .then(response => response.json())
            .then(json => console.log(json))
    }
    changeDataOnServer(){
        const url = "http://localhost:3002/users/" + this.state.selectedUser.id;
       return fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.selectedUser)
        });
    }
    //Runs after construction
    render(){
        const selectedUser = this.state.selectedUser === undefined ?
            'Waiting on user selection' :
            <EditUserComponent selectedUser ={this.state.selectedUser} editUser={this.editUser}/>; // Passing function and state
        return(
            <>
                <label>Users:
                <select onChange={this.selectUserChange}>
                    {this.state.selectOptions}
                </select>
                </label>
                <hr />
                {selectedUser}
            </>
        );
    }
}