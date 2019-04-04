import React from "react";
import LoginContainer from "./login-container";
import LoginForm from "../ui/login-form";
import { login } from "../../actions/app";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorMessage from "../ui/error-message";

class LoginPage extends React.Component {
  renderFlashMessage() {
    if (!this.props.flashMessage) {
      return null;
    }
    return <ErrorMessage>{this.props.flashMessage}</ErrorMessage>;
  }

  render() {
    const { redirect } = this.props;
    const referrer = this.props.location.state.referrer;
    if (redirect && referrer) {
      return <Redirect to={referrer} />;
    }
    const flashMessage = this.renderFlashMessage();
    return (
      <LoginContainer>
        <h1>Login</h1>
        {flashMessage}
        <LoginForm submitCaption="Login" onSubmit={this.props.onSubmit} />
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </LoginContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    flashMessage: state.app.flashMessage,
    redirect: state.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data => dispatch(login(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
