import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams
} from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import useEvent from '../../hooks/useEvent';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';

import { SaveAttendanceInput } from '../../graphql/mutations/saveAttendance';
import { formatEventDate } from '../../utils/Dates';
import InfoItem from '../InfoItem';
import MembersAttendances from '../MembersAttendances';
import MarkAttendanceForm from '../forms/MarkAttendanceForm';
import Header from '../Header';
import useConfirm from '../../hooks/useConfirm';
import ReactModal from 'react-modal';
import ModalHeader from '../modals/ModalHeader';
import LoadingIndicator from '../LoadingIndicator';

interface IEventDetails {
  eventId: string;
  teamId: number;
}

const EventDetailsContainer = (props: IEventDetails) => {
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { currentUser } = useCurrentUser();
  console.log(`Team id: ${props.teamId}`);
  const {
    team,
    loading: loadingTeam,
    teamAuth
  } = useTeam({ id: props.teamId });
  const {
    event,
    loading: loadingEvent,
    saveAttendance,
    deleteEvent
  } = useEvent({ id: props.eventId });
  const [showAttendanceFormModal, setShowAttendanceFormModal] =
    useState<boolean>(false);
  const handleAttendanceSubmit = async (
    values: Omit<SaveAttendanceInput, 'eventId'>
  ) => {
    const result = await saveAttendance(values);
    if (result.success) {
      toast('Event attendance status updated', { type: 'success' });
      setShowAttendanceFormModal(false);
    } else {
      toast('Something went wrong', { type: 'error' });
    }
  };

  const handleDeletePress = async () => {
    const confirmed = await confirm(
      'Are you sure you want to delete the event?'
    );
    if (!confirmed) {
      return;
    }

    const deleteResult = await deleteEvent({
      id: props.eventId
    });

    if (deleteResult.success) {
      toast('Event deleted', { type: 'success' });
      navigate(`/teams/${props.teamId}/events`);
    } else {
      toast(deleteResult.error.message, { type: 'error' });
    }
  };

  if (loadingEvent || loadingTeam) {
    <LoadingIndicator />;
  }
  if (!event || !currentUser || !team) {
    console.log('here');
    console.log(event);
    console.log(currentUser);
    console.log(team);
    return <Navigate to="/not-found" />;
  }

  const isPastEvent = new Date(event.end) < new Date();

  const hasMarkedAttendance = !!event.currentUserEventAttendance;
  const attendanceText = hasMarkedAttendance
    ? event.currentUserEventAttendance?.attendance
      ? 'IN'
      : 'OUT'
    : 'Not decided';
  const initialMarkAttendanceFormValues = event.currentUserEventAttendance
    ? {
        attendance: event.currentUserEventAttendance.attendance,
        reason: event.currentUserEventAttendance.reason || ''
      }
    : undefined;
  return (
    <div>
      <ReactModal
        className="mx-auto xs:w-3/4 md:w-2/4 fixed inset-x-0 top-10 bg-white border-2 border-gray"
        isOpen={showAttendanceFormModal}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <ModalHeader onClose={() => setShowAttendanceFormModal(false)} />
        <div className="p-2 py-0">
          <MarkAttendanceForm
            onSubmit={handleAttendanceSubmit}
            initialValues={initialMarkAttendanceFormValues}
          ></MarkAttendanceForm>
        </div>
      </ReactModal>
      <Header size={3}>{event.name}</Header>
      <div className="flex">
        {teamAuth.event.writeRights && (
          <Link to="edit">
            <Button>Edit</Button>
          </Link>
        )}
        {teamAuth.event.writeRights && (
          <div className="mx-2">
            <Button color="red" onClick={handleDeletePress}>
              Delete{' '}
            </Button>
          </div>
        )}
      </div>
      <InfoItem
        header={isPastEvent ? 'Started' : 'Starts'}
        text={formatEventDate(event.start)}
      />
      <InfoItem
        header={isPastEvent ? 'Ended' : 'Ends'}
        text={formatEventDate(event.end)}
      />
      <InfoItem header="Your attendance">{attendanceText}</InfoItem>
      <div className="my-2">
        <Button
          onClick={() => setShowAttendanceFormModal(!showAttendanceFormModal)}
          size="sm"
          fullW={false}
        >
          Change attendance
        </Button>
      </div>
      <InfoItem header="Member attendances">
        <MembersAttendances
          currentUserId={currentUser.id}
          currentUserAttendance={event.currentUserEventAttendance}
          allTeamMembers={team.memberships}
          attendances={event.userAttendances}
        />
      </InfoItem>
    </div>
  );
};

export default EventDetailsContainer;
