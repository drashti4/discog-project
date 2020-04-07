import React from "react";

export default class EditUserComponent extends React.Component{
    render() {
         return(
             <>
                <label>{this.props.selectedUser.id}</label>
                 <input type="text" name='userName' value={this.props.selectedUser.userName} onChange={this.props.editUser}></input>
                 <input type="number" name='age' value={this.props.selectedUser.age} onChange={this.props.editUser} ></input>
             </>
         )
    }
}