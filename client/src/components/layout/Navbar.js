import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";

import NavbarItem from "./NavbarItem";

class Navbar extends Component {
  logoutClickHandler = () => {
    this.props.logoutUser();
  };

  render() {
    const allContracts = (
      <NavbarItem title="All contracts" url="/all-contracts" />
    );

    const settings = <NavbarItem title="Configurator" url="/configurator" />;

    const navbar = (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              {this.props.auth.user.userRights === "Admin"
                ? allContracts
                : null}
              <NavbarItem title="Create contract" url="/create-contract" />
            </ul>
            <ul className="navbar-nav m-auto">
              <li className="text-white">
                <b>Logged in as: {this.props.auth.user.name}</b>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {this.props.auth.user.userRights === "Admin" ? settings : null}

              <li className="nav-item text-white">
                <button
                  type="button"
                  className="btn btn-link nav-link"
                  onClick={this.logoutClickHandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

    return this.props.auth.isAuthenticated ? navbar : null;
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
