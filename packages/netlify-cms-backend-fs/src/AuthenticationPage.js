import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'react-emotion';
import { AuthenticationPage, Icon } from 'netlify-cms-ui-default';

const LoginButtonIcon = styled(Icon)`
  margin-right: 18px;
`;

export default class FileSystemAuthenticationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'developer@localhost.com' };
    this.props = props;
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    /**
     * Allow login screen to be skipped for dev purposes.
     */
    const skipLogin = this.props.config.getIn(['backend', 'login']) === false;
    if (skipLogin) {
      this.props.onLogin(this.state);
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.onLogin(this.state);
  }

  render() {
    const { inProgress, config } = this.props;
    const logoPath = config.get('logo_url') || '/assets/media/logo.svg';

    return (
      <AuthenticationPage
        onLogin={this.handleLogin}
        loginDisabled={inProgress}
        loginErrorMessage={this.state.loginError}
        logoUrl={logoPath}
        renderButtonContent={() => (
          <React.Fragment>
            <LoginButtonIcon type="folder" /> {inProgress ? 'Logging in...' : 'Login to File System'}
          </React.Fragment>
        )}
      />
    );
  }
}

AuthenticationPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  config: ImmutablePropTypes.map,
};
