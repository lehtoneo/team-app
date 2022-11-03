import React from 'react';
import { Event } from '../../graphql/queries/event';
import { Team } from '../../graphql/queries/team';
import useEvent from '../../hooks/useEvent';
import useTeam from '../../hooks/useTeam';
import useTeamAuth from '../../hooks/useTeam/useTeamAuth';
import teamAuthUtils from '../../utils/teamAuth';
import EventDetailsContainer from '../eventComps/EventDetailsContainer';
import EventFormContainer from '../forms/EventFormContainer';
import LoadingIndicator from '../LoadingIndicator';
import StyledModal, { StyledModalProps } from './StyledModal';

interface IEventModalContentProps {
  event: Event;
}
const EventModalContent: React.FC<IEventModalContentProps> = (props) => {
  const { teamAuth } = useTeamAuth({
    currentUserTeamMembership: props.event.team.currentUserTeamMembership
  });
  console.log('event');
  console.log(props.event);
  return (
    <EventDetailsContainer
      eventId={props.event.id}
      teamId={Number(props.event.team.id)}
    />
  );
};

interface IViewEventModalProps extends StyledModalProps {
  eventId: string;
}

const EventDetailsModal: React.FC<IViewEventModalProps> = (props) => {
  const singleEvent = useEvent({ id: props.eventId });
  console.log(singleEvent);
  return (
    <StyledModal {...props}>
      {singleEvent.loading || !singleEvent.event ? (
        <LoadingIndicator />
      ) : (
        <EventModalContent event={singleEvent.event} />
      )}
    </StyledModal>
  );
};

export default EventDetailsModal;
