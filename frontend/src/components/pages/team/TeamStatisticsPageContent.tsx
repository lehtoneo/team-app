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

interface MemberStatsTableProps {
  members: TeamTeamMembership[];
  pastEventCount: number;
}

const MemberStatsTable: React.FC<MemberStatsTableProps> = (props) => {
  const { members } = props;
  const membersCopy = [...members];
  const membersSorted = membersCopy.sort(
    (a, b) =>
      b.statistics.pastEventsAttendanceRatio -
      a.statistics.pastEventsAttendanceRatio
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
            const attendancePercent = Math.round(
              member.statistics.pastEventsAttendanceRatio * 100
            );
            return (
              <tr key={member.id}>
                <TD>{member.user.firstname}</TD>
                <TD>{member.statistics.pastEventsAttendanceCount}</TD>
                <TD>{attendancePercent} %</TD>
              </tr>
            );
          })}
        </TBody>
      </Table>
    </TableContainer>
  );
};

const TeamStatisticsPageContent: React.FC<TeamMainPageContentProps> = (
  props: TeamMainPageContentProps
) => {
  const { team } = useTeam({ id: props.teamId });

  return (
    <div>
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

export default TeamStatisticsPageContent;
