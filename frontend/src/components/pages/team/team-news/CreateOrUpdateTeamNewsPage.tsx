import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCreateOrUpdateTeamNews from '../../../../hooks/useTeamNews/useCreateOrUpdateTeamNews';
import TeamNewsForm, { TeamNewsFormValues } from '../../../forms/TeamNewsForm';

const CreateOrUpdateTeamNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { newsId, teamId } = useParams();
  const { createOrUpdate, error } = useCreateOrUpdateTeamNews();
  const type = newsId ? 'edit' : 'create';
  const handleSubmit = async (values: TeamNewsFormValues) => {
    const result = await createOrUpdate({ id: newsId, teamId, ...values });
    if (result.success) {
      const successtext = type === 'create' ? 'News created' : 'News edited';
      toast(successtext, { type: 'success' });
      navigate(-1);
    } else {
      console.log(result.error);
      toast('Something went wrong', { type: 'error' });
    }
  };
  return <TeamNewsForm onSubmit={handleSubmit} type={type} />;
};

export default CreateOrUpdateTeamNewsPage;
