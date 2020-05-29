import React, { Component } from "react";
import { connect } from "react-redux";
import { FaRegEdit, FaWindowClose } from 'react-icons/fa';

import { editUserDetails } from "../redux/actions/userActions";

class EditDetails extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    contact: "",
    address: "",
    open: false
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.setState({
      firstName: credentials.firstName ? credentials.firstName : "",
      lastName: credentials.lastName ? credentials.lastName : "",
      age: credentials.age ? credentials.age : "",
      contact: credentials.contact ? credentials.contact : "",
      address: credentials.address ? credentials.address : ""
    });
  };

  handleOpen = () => {
    const { credentials } = this.props;
    this.setState({
      firstName: credentials.firstName ? credentials.firstName : "",
      lastName: credentials.lastName ? credentials.lastName : "",
      age: credentials.age ? credentials.age : "",
      contact: credentials.contact ? credentials.contact : "",
      address: credentials.address ? credentials.address : "",
      open: true
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      contact: this.state.contact,
      address: this.state.address
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render(){
    return(
      <div>
          <FaRegEdit title="Edit Your Deatils" className="open-btn" onClick={this.handleOpen}/>
        {this.state.open && 
        <div className="edit-user-details">
          <FaWindowClose title="Go Back" className="close-btn" onClick={this.handleClose} />
          <h2>Edit your Details</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input name="firstName" placeholder="First Name" type="text" value={this.state.firstName} onChange={this.onChange} />
            </div>
            <div>
              <input name="lastName" placeholder="Last Name" type="text" value={this.state.lastName} onChange={this.onChange} />
            </div>
            <div>
              <input name="age" placeholder="Age" type="text" value={this.state.age} onChange={this.onChange} />
            </div>
            <div>
              <input name="contact" placeholder="Contact" type="text" value={this.state.contact} onChange={this.onChange} />
            </div>
            <div>
              <textarea name="address" placeholder="Adress" type="text" value={this.state.address} onChange={this.onChange} />
            </div>
            <button type="submit">save</button>
          </form>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
