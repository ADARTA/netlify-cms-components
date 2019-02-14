import React from 'react'
import Authentication from './components/Authentication';
import LoginButtonIcon from './components/FolderIcon';

function AuthenticationPage({ config, onLogin, inProgress }) {
  const {user, setUser} = React.useState({ email: 'developer@localhost.com' })
  const {loggingIn, setLoggingIn} = React.useState(inProgress)
  const logoPath = config.get('logo_url') || ''

  function handleLogin(e) {
    e.preventDefault()
    onLogin(user)
  }

  React.useEffect(() => {
    const skipLogin = config.getIn(['backend', 'login']) === false
    if (skipLogin) onLogin(user)
  })

  return <Authentication
    onLogin={handleLogin}
    loginDisabled={inProgress}
    logoUrl={logoPath}
    renderButtonContent={() => (
      <React.Fragment>
        <LoginButtonIcon type="folder" /> {inProgress ? 'Logging in...' : 'Login to File System'}
      </React.Fragment>
    )}
  />
}


export default AuthenticationPage
