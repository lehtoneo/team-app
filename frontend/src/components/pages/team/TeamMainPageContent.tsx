import { TeamTeamMembership } from '../../../graphql/queries/team';
import useTeam from '../../../hooks/useTeam';
import Button from '../../Button';
import Header from '../../Header';
import InfoItem from '../../InfoItem';
import Table from '../../tableComps/Table';
import TableContainer from '../../tableComps/TableContainer';
import TBody from '../../tableComps/TBody';
import TD from '../../tableComps/TD';
import TH from '../../tableComps/TH';

interface TeamMainPageContentProps {
  teamId: number;
}

interface TeamMemberProps {
  member: TeamTeamMembership;
}

interface MemberStatsTableProps {
  members: TeamTeamMembership[];
  pastEventCount: number;
}

const MemberStatsTable: React.FC<MemberStatsTableProps> = (props) => {
  const { members } = props;
  const membersCopy = [...members];
  const membersSorted = membersCopy.sort(
    (a, b) =>
      b.statistics.pastEventsAttendanceCount -
      a.statistics.pastEventsAttendanceCount
  );
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TH>Member</TH>
            <TH>Events attended</TH>
            <TH>Event attendance ratio</TH>
          </tr>
        </thead>
        <TBody>
          {membersSorted.map((member) => {
            const attendanceRatio =
              (member.statistics.pastEventsAttendanceCount /
                props.pastEventCount) *
              100;
            return (
              <tr key={member.id}>
                <TD>{member.user.firstname}</TD>
                <TD>{member.statistics.pastEventsAttendanceCount}</TD>
                <TD>{Math.round(attendanceRatio)} %</TD>
              </tr>
            );
          })}
        </TBody>
      </Table>
    </TableContainer>
  );
};

const TeamMemberStatistics: React.FC<TeamMemberProps> = (props) => {
  const { member } = props;
  return (
    <div>
      <div>{member.user.firstname}</div>
      <div>{member.statistics.pastEventsAttendanceCount}</div>
    </div>
  );
};

const TeamMainPageContent: React.FC<TeamMainPageContentProps> = (
  props: TeamMainPageContentProps
) => {
  const { team } = useTeam({ id: props.teamId });
  const isOwner = team?.currentUserTeamMembership.role === 'OWNER';
  const url = new URL(window.location.href);
  // eslint-disable-next-line no-useless-concat
  const joinLink = url.origin + '/#' + `/teams/join/${team?.joinId}`;

  return (
    <div>
      {isOwner && team.joinId && (
        <div className="flex my-3">
          <Button onClick={() => navigator.clipboard.writeText(joinLink)}>
            Copy join link
          </Button>
        </div>
      )}
      <Header size={2}>Statistics</Header>
      <InfoItem header="Past events count">{team?.pastEventsCount}</InfoItem>
      <InfoItem header="Member attendances">
        <MemberStatsTable
          members={team?.memberships || []}
          pastEventCount={team?.pastEventsCount || 1}
        />
      </InfoItem>
    </div>
  );
};

export default TeamMainPageContent;
