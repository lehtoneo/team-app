import React from 'react';
import { Link } from 'react-router-dom';
import { TeamListInfo } from '../graphql/queries/teamConnection';

interface ITeamListProps {
  teams: TeamListInfo[];
}

const Team = ({
  team,
  onClick
}: {
  team: TeamListInfo;
  onClick?: (id: number) => any;
}) => {
  return (
    <Link to={`/teams/${team.id}`}>
      <div className="border-2 my-1">
        <div className="p-2">{team.name}</div>
      </div>
    </Link>
  );
};

const TeamList = (props: ITeamListProps) => {
  return (
    <div>
      {props.teams.map((team) => {
        return <Team team={team} key={team.id} />;
      })}
    </div>
  );
};

export default TeamList;
