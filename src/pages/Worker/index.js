import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Worker({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', 0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/workers/${id}`);
        // const picture = get(data, 'Pictures[0].url', '');

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400)
          errors.map((error) => {
            toast.error(error);
          });
        history.push('/');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (firstName.length < 3 || firstName.length > 255) {
      toast.error('First name must be between 3 and 255 characters');
      formErrors = true;
    }
    if (lastName.length < 3 || lastName.length > 255) {
      toast.error('Last name must be between 3 and 255 characters');
      formErrors = true;
    }
    if (!isEmail(email)) {
      toast.error('Invalid email');
      formErrors = true;
    }
    if (!isInt(String(age))) {
      toast.error('Invalid age');
      formErrors = true;
    }
    if (!isFloat(String(weight))) {
      toast.error('Invalid weight');
      formErrors = true;
    }
    if (!isFloat(String(height))) {
      toast.error('Invalid height');
      formErrors = true;
    }
    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/workers/${id}`, {
          firstName,
          lastName,
          email,
          age,
          weight,
          height,
        });

        toast.success('Success! Worker edited');
      } else {
        const { data } = await axios.post(`/workers/`, {
          firstName: firstName,
          lastName: lastName,
          email,
          age,
          weight,
          height,
        });

        toast.success('Success! Worker created');
        history.push(`/worker/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Unknown error');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Edit worker' : 'New worker'}</h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
        />
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
        />
        <button type="submit">Send</button>
      </Form>
    </Container>
  );
}

Worker.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
