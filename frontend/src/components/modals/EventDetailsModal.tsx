import React from 'react';
import { Event } from '../../graphql/queries/event';
import { Team } from '../../graphql/queries/team';
import useEvent from '../../hooks/useEvent';
import EventDetailsContainer from '../eventComps/EventDetailsContainer';
import LoadingIndicator from '../LoadingIndicator';
import StyledModal, { StyledModalProps } from './StyledModal';

interface IEventModalContentProps {
  event: Event;
}
const EventModalContent: React.FC<IEventModalContentProps> = (props) => {
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
