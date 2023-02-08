import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import moment from 'moment';
import { TeamNewsNode } from '../../graphql/queries/newsConnection';
import useTeamNewsConnection from '../../hooks/useTeamNews/useTeamNewsConnection';

interface ITeamNewsListProps {
  teamId: number;
}

interface INewsItemProps {
  news: TeamNewsNode;
  onReached?: () => any;
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
    <div ref={ref} className="flex flex-col border-2 border-green mb-2 p-2">
      <div className="flex font-bold text-lg">{news.title}</div>
      <div className="flex truncate">{news.description}</div>
      <div className="flex ">Published {createdAtFormatted}</div>
    </div>
  );
};

const TeamNewsList: React.FC<ITeamNewsListProps> = (props) => {
  const t = useTeamNewsConnection(props.teamId);

  return (
    <div className="content">
      {t.data &&
        t.data.newsConnection?.edges.map((e, index) => {
          const isLast = index + 1 === t.data?.newsConnection?.edges.length;
          return (
            <NewsItem
              key={e.node.id}
              news={e.node}
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
