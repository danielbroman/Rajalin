import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';

import Logo from '../../assets/img/Rajalin-logo-min.png';
import InputField from '../common/InputField';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 login-logo">
              <img alt="logo" src={Logo} />
            </div>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6 offset-md-3 form-group mt-4">
                <InputField
                  onChange={this.onChangeHandler}
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="text"
                  value={this.state.email}
                  error={errors.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3 form-group mt-4">
                <InputField
                  onChange={this.onChangeHandler}
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  error={errors.password}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-4 text-center">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
