import React from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { CreateTeamInput } from '../../graphql/mutations/team/createTeam';
import useCreateTeam from '../../hooks/useTeam/useCreateTeam';
import TeamBaseInfoForm from '../forms/TeamBaseInfoForm';
import PageContainer from './components/PageContainer';

const CreateTeamPage = () => {
  const navigate = useNavigate();
  const { createTeam, error } = useCreateTeam();
  const handleSubmit = async (values: CreateTeamInput) => {
    const result = await createTeam(values);
    const { success, team } = result;
    if (success) {
      toast(`Team "${team.name}" created!`, { type: 'success' });
      navigate(`/teams/${team.id}`);
    } else {
      toast(result.error.message, { type: 'error' });
    }
  };
  return (
    <PageContainer>
      <TeamBaseInfoForm onSubmit={handleSubmit} error={error?.message} />
    </PageContainer>
  );
};

export default CreateTeamPage;
