import React from 'react';
import { TeamNewsNode } from '../../graphql/queries/newsConnection';
import useTeamNewsConnection from '../../hooks/useTeamNews/useTeamNewsConnection';

interface ITeamNewsListProps {
  teamId: number;
}

const NewsItem: React.FC<{ news: TeamNewsNode }> = (props) => {
  const news = props.news;
  return (
    <div className="border-2 border-green mb-2 p-2">
      <div className="font-bold text-lg">{news.title}</div>
      <div>{news.description}</div>
    </div>
  );
};

const TeamNewsList: React.FC<ITeamNewsListProps> = (props) => {
  const t = useTeamNewsConnection(props.teamId);
  return (
    <div className="content">
      {t.data &&
        t.data.newsConnection?.edges.map((e) => (
          <NewsItem key={e.node.id} news={e.node} />
        ))}
    </div>
  );
};

export default TeamNewsList;
