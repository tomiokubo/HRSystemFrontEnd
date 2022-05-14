import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const storedName = useSelector((state) => state.auth.user.name);
  const storedEmail = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setName(storedName);
    setEmail(storedEmail);
  }, [id, storedEmail, storedName]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Name must be between 3 and 255 characters');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid email');
    }
    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Your password must be between 6 and 50 characters');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ name, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Edit your information' : 'Create your account'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>
        <button type="submit">{id ? 'Save' : 'Create'}</button>
      </Form>
    </Container>
  );
}
