import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Pictures({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [picture, setPicture] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/workers/${id}`);
        setPicture(get(data, 'Pictures[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Error! Could not load picture');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const pictureURL = URL.createObjectURL(file);

    setPicture(pictureURL);

    const formData = new FormData();

    formData.append('worker_id', id);
    formData.append('picture', file);

    try {
      setIsLoading(true);
      await axios.post('/pictures/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Success! Picture updated');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'resonde', '');
      toast.error('Picture could not be updated');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Pictures</Title>
      <Form>
        <label htmlFor="picture">
          {picture ? (
            <img crossOrigin="" src={picture} alt="Picture" />
          ) : (
            'Select'
          )}
          <input type="file" id="picture" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Pictures.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
