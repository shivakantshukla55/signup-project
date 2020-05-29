import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { loginUser } from "../redux/actions/userActions";

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
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
        <h2>Login</h2>
        <form noValidate onSubmit={this.handleSubmit}>
          <div>
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
            {errors && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}></input>
            {errors && <span className="error">{errors.password}</span>}
          </div>
          {errors.general && <span className="error">{errors.general}</span>}
          <button type="submit" disabled={loading}>Login</button>
          {loading && <Loader 
          type="TailSpin"
          color="#00BFFF"
          height={50}
          width={50}
        />}
          <span>don't have an account? <Link to="/signup">Sign up</Link></span>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
