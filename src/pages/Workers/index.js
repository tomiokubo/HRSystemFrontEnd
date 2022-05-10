import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import { WorkerContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('/workers');
      setWorkers(response.data);
    }
    getData();
  }, []);
  return (
    <Container>
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
