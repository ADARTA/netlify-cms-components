import React from 'react'
import Authentication from './components/Authentication';

const defaultUser = { email: 'developer@localhost.com' }

function AuthenticationPage({ config, onLogin, inProgress }) {
  const [user, setUser] = React.useState(defaultUser)
  const [loggingIn, setLoggingIn] = React.useState(inProgress)
  const logoPath = config.get('logo_url') || ''
  const skipLogin = config.getIn(['backend', 'login']) === false

  const handleLogin = event => {
    event.preventDefault()
    console.log('user:', user)
    onLogin(user)
  }

  React.useEffect(() => {
    if (skipLogin) onLogin(defaultUser)
  })

  React.useEffect(() => {
    setLoggingIn(inProgress)
    if (inProgress) setUser(defaultUser)
  }, [inProgress])

  return <Authentication
    onLogin={handleLogin}
    loginDisabled={inProgress}
    logoUrl={logoPath}
  />
}

export default AuthenticationPage
