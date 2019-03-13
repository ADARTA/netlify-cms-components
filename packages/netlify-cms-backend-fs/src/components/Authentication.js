/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import LoginButtonIcon from './FolderIcon';

const shadows = {
  drop: css`
    box-shadow: 0 2px 4px 0 rgba(19, 39, 48, 0.12);
  `,
  dropDeep: css`
    box-shadow: 0 4px 12px 0 rgba(68, 74, 87, 0.15), 0 1px 3px 0 rgba(68, 74, 87, 0.25);
  `,
};

const buttons = {
  button: css`
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  `,
  default: css`
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    padding: 0 15px;
    background-color: #798291;
    color: #fff;
  `,
  gray: css`
    background-color: #798291;
    color: #fff;

    &:focus,
    &:hover {
      color: #fff;
      background-color: #555a65;
    }
  `,
  disabled: css`
    background-color: #eff0f4;
    color: #798291;
  `,
};

const pageCss = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const wrapperCss = css`
  width: 300px;
  height: 200px;
  margin-top: -150px;
`

function StyledAuthenticationPage({ children }) {
  return (
  <section css={[pageCss]}>
    {children}
  </section>
  )
}

function renderPageLogo({ logoUrl }) {
  if (logoUrl) {
    return (
      <span css={[wrapperCss]}>
        <img src={logoUrl} alt="Logo" />
      </span>
    )
  }
  return null
}

const buttonCss = css`
  padding: 0 12px;
  margin-top: -40px;
  display: flex;
  align-items: center;
  position: relative;
`
const buttonLogoCss = css`
  width: 24px;
  height: 24px;
  `

function LoginLabel({ progress }) {

  return (
    <React.Fragment>
      <span css={[buttonLogoCss]}><LoginButtonIcon type="folder" /></span> {progress ? 'Logging in...' : 'Login to File System'}
    </React.Fragment>
  )
}

function Authentication({
  onLogin,
  loginStatus,
  loginErrorMessage,
  logoUrl,
}) {
  const [status, setStatus] = React.useState(loginStatus)

  React.useEffect(() => {
    setStatus(loginStatus)
  }, [loginStatus])

  return (
    <StyledAuthenticationPage>
      {renderPageLogo(logoUrl)}
      {loginErrorMessage ? <p>{loginErrorMessage}</p> : null}
      <button
        disabled={status}
        onClick={onLogin}
        css={[
          buttons.button,
          shadows.dropDeep,
          buttons.default,
          buttons.gray,
          status && buttons.disabled,
          buttonCss,
        ]}
      >
        <LoginLabel progress={status} />
      </button>
    </StyledAuthenticationPage>
  );
}

export default Authentication;
