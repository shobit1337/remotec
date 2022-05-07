import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import { useAuth } from '../../context';
import { flexCenter } from '../../styles/commonObjectStyles';
import { CreateWorkspaceModal, JoinWorkspaceModal } from './components';

const OnboardingPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.workspace?.length > 0) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  return (
    <Container sx={{ ...flexCenter, minHeight: '100vh' }}>
      <Container sx={{ ...flexCenter, gap: 10, flexWrap: 'wrap' }}>
        <CreateWorkspaceModal />
        <JoinWorkspaceModal />
      </Container>
    </Container>
  );
};

export default OnboardingPage;
