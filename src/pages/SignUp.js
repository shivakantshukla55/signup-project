import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from "react-redux";

import { signupUser } from "../redux/actions/userActions";

class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.UI.errors) {
      this.setState( { errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render(){
    const { UI: { loading } } = this.props;
    const { errors } = this.state;

    return(
      <div className="login">
        <h2>Sign up</h2>
        <form noValidate onSubmit={this.handleSubmit}>
          <div>
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
            {errors && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
            {errors && <span className="error">{errors.password}</span>}
          </div>
          <div>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange}></input>
            {errors && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div>
            <input type="text" name="handle" placeholder="Handle" value={this.state.handle} onChange={this.handleChange}></input>
            {errors && <span className="error">{errors.handle}</span>}
          </div>
          {errors.general && <span className="error">{errors.general}</span>}
          <button type="submit" disabled={loading}>Sign up</button>
          {loading && <Loader 
          type="TailSpin"
          color="#00BFFF"
          height={50}
          width={50}
        />}
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(SignUp);
