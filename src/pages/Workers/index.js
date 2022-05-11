import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import { WorkerContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

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
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Workers</h1>
      <WorkerContainer>
        {workers.map((worker) => (
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
            <Link to={`/worker/${worker.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </WorkerContainer>
    </Container>
  );
}
