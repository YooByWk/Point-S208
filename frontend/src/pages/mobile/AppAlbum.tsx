/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
interface TransitionDivProps {
  out: boolean;
}
const AppAlbum = () => {
  const location = useLocation()
  const [out, setOut] = React.useState(false);
  React.useEffect(() => {
    setOut(true);
    const timer = setTimeout(() => setOut(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);
  
  return (
    <TransitionDiv out={out}>
      <SwitchTransition>
        <CSSTransition key={location.key} timeout={4000} classNames='slide'>
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </TransitionDiv>
  );
}

export default AppAlbum
const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TransitionDiv = styled.div<TransitionDivProps>`
  animation: ${props => props.out ? css`${slideOut} 1s ease-out forwards` : css`${slideIn} 1s ease-in forwards`};
  height: 100vh;
  width: 100%;
  position: absolute;
`;