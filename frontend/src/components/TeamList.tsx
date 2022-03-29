import React from 'react';
import { Team } from '../graphql/commonTypes';

interface ITeamListProps {
  teams: Team[];
}

const TeamList = (props: ITeamListProps) => {
  return (
    <div>
      {props.teams.map((team) => {
        return (
          <div key={team.id}>
            {team.description}
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default TeamList;
