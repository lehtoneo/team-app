import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import { TeamNewsNode } from '../../graphql/queries/newsConnection';
import useTeamNewsConnection from '../../hooks/useTeamNews/useTeamNewsConnection';
import Card from '../Card';
import teamAuthUtils from '../../utils/teamAuth';
import useTeam from '../../hooks/useTeam';
import { Link } from 'react-router-dom';

interface ITeamNewsListProps {
  teamId: number;
}

interface INewsItemProps {
  news: TeamNewsNode;
  onReached?: () => any;
  canEdit: boolean;
}
const NewsItem: React.FC<INewsItemProps> = (props) => {
  const news = props.news;
  const createdAtFormatted = moment(news.createdAt).format(
    'DD.MM.yyyy hh:mm:ss'
  );
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
    initialInView: false
  });
  useEffect(() => {
    if (inView && props.onReached) {
      props.onReached();
    }
  }, [inView]);
  return (
    <Card
      viewRef={ref}
      title={news.title}
      description={news.description}
      createdAt={createdAtFormatted}
      footerRightComponent={
        props.canEdit ? (
          <Link to={`news/${news.id}/edit`} className="link-text">
            Edit
          </Link>
        ) : (
          ''
        )
      }
    />
  );
};

const TeamNewsList: React.FC<ITeamNewsListProps> = (props) => {
  const t = useTeamNewsConnection(props.teamId);
  const { teamAuth } = useTeam({ id: props.teamId });
  return (
    <div className="content">
      {t.data &&
        t.data.newsConnection?.edges.map((e, index) => {
          const isLast = index + 1 === t.data?.newsConnection?.edges.length;
          return (
            <NewsItem
              key={e.node.id}
              news={e.node}
              canEdit={teamAuth.news.writeRights}
              onReached={
                isLast
                  ? async () => {
                      await t.fetchMoreIfCanAsync();
                    }
                  : undefined
              }
            />
          );
        })}
      {t.fetchingMore && <div>Loading....</div>}
      {t.data?.newsConnection?.pageInfo.hasNextPage === false && <hr />}
    </div>
  );
};

export default TeamNewsList;
