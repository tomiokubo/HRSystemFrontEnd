import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import { WorkerContainer, ProfilePicture, NewWorker } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/workers');
      setWorkers(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'bock');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/workers/${id}`);
      const newWorkers = [...workers];
      newWorkers.splice(index, 1);
      setWorkers(newWorkers);
    } catch (error) {
      const status = get(error, 'response.status', 0);
      if (status === 401) {
        toast.error('Login required');
        return;
      } else {
        toast.error('Could not delete worker');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Workers</h1>

      <NewWorker to="/worker/">New worker</NewWorker>

      <WorkerContainer>
        {workers.map((worker, index) => (
          <div key={String(worker.id)}>
            <ProfilePicture>
              {get(worker, 'Pictures[0].url', false) ? (
                <img crossOrigin="" src={worker.Pictures[0].url} />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{worker.first_name}</span>
            <span>{worker.email}</span>

            <Link to={`/worker/${worker.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/worker/${worker.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, worker.id, index)}
            />
          </div>
        ))}
      </WorkerContainer>
    </Container>
  );
}
