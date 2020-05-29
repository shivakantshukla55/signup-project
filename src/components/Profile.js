import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner';

import { logoutUser, uploadImage } from "../redux/actions/userActions";
import EditDetails from "./EditDetails";

class Profile extends Component {

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { user: { credentials: { handle, firstName, lastName, imageUrl, contact, address, age}, loading, authenticated}} = this.props;

    let profileMarkUp = !loading ? (authenticated ? (
      <div className="profile-container">
        <div className="profile-pic-container">
          <img src={imageUrl} alt="profile-pic"></img>
          <input type="file" onChange={this.handleImageChange} />
        </div>
        <div className="user-details">
          <div>
            <span>User Id:</span>
            <span>{handle}</span>
          </div>
          {firstName && 
          <div>
            <span>First Name:</span>
            <span>{firstName}</span>  
          </div>}
          {lastName && 
          <div>
            <span>Last Name:</span>
            <span>{lastName}</span>
          </div>
          }
          {age && 
          <div>
            <span>Age:</span>
            <span>{age}</span>
          </div>
          }
          {contact && 
          <div>
            <span>Contact:</span>
            <span>{contact}</span>
          </div>
          }
          {address && 
          <div>
            <span>Address:</span>
            <span>{address}</span>
          </div>
          }
        </div>
        <div>
          <button type="button" className="logout-btn" onClick={this.handleLogout}>Logout</button>
        </div>
        <EditDetails />
      </div>
    ) : (
      <div>
        <p>Not authenticated, please Login</p>
      </div>
    )) : (<Loader 
      type="TailSpin"
      color="#00BFFF"
      height={50}
      width={50}
    />)

    return (
      <div className="profile">
        {profileMarkUp}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapActionsToProps)(Profile);
