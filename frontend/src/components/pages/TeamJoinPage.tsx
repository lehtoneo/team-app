import React, { useState } from 'react';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { toast } from 'react-toastify';
import useCurrentUser from '../../hooks/useCurrentUser';
import useSignIn from '../../hooks/useSignIn';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';
import EventList from '../EventList';
import Header from '../Header';
import PageContainer from './components/PageContainer';

interface TeamJoinPageContentProps {
  joinId: string;
}

const NotLoggedInContent: React.FC = () => {
  const { setUserWantsToLogin } = useSignIn();
  return (
    <div>
      <div className="text-xl my-2">
        You need to be signed in to join a team
      </div>
      <div className="my-2">
        <Button onClick={() => setUserWantsToLogin(true)}>Sign In</Button>
      </div>
    </div>
  );
};

interface LoggedInContentProps extends TeamJoinPageContentProps {}

const LoggedInContent: React.FC<LoggedInContentProps> = (props) => {
  const navigate = useNavigate();
  const [joining, setJoining] = useState<boolean>(false);
  const { joinTeam, joinTeamError } = useTeam({ joinId: props.joinId });
  const handleJoinClick = async () => {
    setJoining(true);
    const result = await joinTeam({ joinId: props.joinId });
    if (result.success) {
      toast(`Joined team ${result.team.name} succesfully`, { type: 'success' });
      navigate(`/teams/${result.team.id}`);
    } else {
      toast(`Something went wrong`, { type: 'error' });
    }
    setJoining(false);
  };
  return (
    <div>
      {joinTeamError && <div>{joinTeamError.message}</div>}
      <div className="my-3">
        <Button color="green" disabled={joining} onClick={handleJoinClick}>
          {joining ? 'Joining...' : 'Join'}
        </Button>
      </div>
    </div>
  );
};

const TeamJoinPageContent = (props: TeamJoinPageContentProps) => {
  const { isLoggedIn } = useCurrentUser();
  const { team } = useTeam({ joinId: props.joinId });
  if (isLoggedIn === undefined) {
    return <div>Loading</div>;
  }

  return (
    <PageContainer header={`Join team ${team?.name}`}>
      {isLoggedIn ? (
        <LoggedInContent joinId={props.joinId} />
      ) : (
        <NotLoggedInContent />
      )}
    </PageContainer>
  );
};

const TeamJoinPage = () => {
  const { joinId } = useParams();
  if (!joinId) {
    return <Navigate to="/" />;
  }
  return <TeamJoinPageContent joinId={joinId} />;
};

export default TeamJoinPage;
