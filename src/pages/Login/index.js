import React from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { Title } from './styled';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(exampleActions.clickButtonRequest());
  }
  return (
    <Container>
      <Title>Login</Title>
      <button type="button" onClick={handleClick}>
        Send
      </button>
    </Container>
  );
}
