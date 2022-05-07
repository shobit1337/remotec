import { Container } from '@mui/material';

import { flexCenter } from '../../styles/commonObjectStyles';
import { CreateWorkspaceModal, JoinWorkspaceModal } from './components';

const OnboardingPage = () => {
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
