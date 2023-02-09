import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTeamNews from '../../../../hooks/useTeamNews';
import useCreateOrUpdateTeamNews from '../../../../hooks/useTeamNews/useCreateOrUpdateTeamNews';
import TeamNewsForm, { TeamNewsFormValues } from '../../../forms/TeamNewsForm';
import LoadingIndicator from '../../../LoadingIndicator';
import NotFoundPage from '../../NotFoundPage';

const CreateOrUpdateTeamNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { newsId: newsIdString, teamId: teamIdString } = useParams();
  const teamId = teamIdString ? Number(teamIdString) : undefined;
  const newsId = newsIdString ? Number(newsIdString) : undefined;
  const teamNews = useTeamNews(newsId);
  console.log({ teamNews });
  const { createOrUpdate, error } = useCreateOrUpdateTeamNews();
  const type = newsIdString ? 'edit' : 'create';
  const handleSubmit = async (values: TeamNewsFormValues) => {
    console.log({ teamId: teamIdString });
    const result = await createOrUpdate({
      id: newsId,
      teamId,
      ...values
    });
    if (result.success) {
      const successtext = type === 'create' ? 'News created' : 'News edited';
      toast(successtext, { type: 'success' });
      navigate(-1);
    } else {
      console.log(result.error);
      toast('Something went wrong', { type: 'error' });
    }
  };

  if (newsIdString && teamNews.loading) {
    return <LoadingIndicator />;
  }
  if (newsIdString && !teamNews.data) {
    return <NotFoundPage />;
  }
  return (
    <TeamNewsForm
      onSubmit={handleSubmit}
      type={type}
      initialValues={
        teamNews.data
          ? {
              title: teamNews.data.title,
              description: teamNews.data.description
            }
          : undefined
      }
    />
  );
};

export default CreateOrUpdateTeamNewsPage;
