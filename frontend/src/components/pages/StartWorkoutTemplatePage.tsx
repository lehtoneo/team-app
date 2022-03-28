import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../hooks/useCurrentUser';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';

interface IGymExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest: number;
}

interface IWorkoutBase {
  id: string;
  name: string;
  type: 'gym' | 'cardio';
}

interface IGymWorkout extends IWorkoutBase {
  type: 'gym';
  exercises: IGymExercise[];
}

interface ICardioWorkout extends IWorkoutBase {
  type: 'cardio';
  length: number;
}

type IWorkout = IGymWorkout | ICardioWorkout;

const CardioTemplate = (props: ICardioWorkout) => {
  return <div></div>;
};

const GymTemplate = (props: IGymWorkout) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="p-2 bg-green-700">
      <div className="flex-row flex-wrap">
        <div className="font-bold">{props.name}</div>
        <div className="flex">
          <div className="flex flex-auto">
            <div className="flex">
              <Button onClick={() => setExpanded(!expanded)}>Expand</Button>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="flex-row">
            <div className="text-sm">Exercises</div>
            <div className="flex-row">
              {props.exercises.map((ex) => {
                return (
                  <div className="">
                    <p className="font-bold">{ex.name}</p>
                    <p>Sets {ex.sets}</p>
                    <p>Reps {ex.reps}</p>
                    <p>Rest {ex.rest}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Template = (props: IWorkout) => {
  switch (props.type) {
    case 'cardio':
      return <CardioTemplate {...props} />;
    case 'gym':
      return <GymTemplate {...props} />;

    default:
      return <h1>No project match</h1>;
  }
};

const templates: IWorkout[] = [
  {
    id: '1',
    type: 'gym',
    name: 'Golden six',
    exercises: [
      {
        id: '1',
        name: 'Squat',
        rest: 120,
        sets: 3,
        reps: 10,
        weight: 60
      },
      {
        id: '1',
        name: 'Bench press',
        rest: 120,
        sets: 3,
        reps: 10,
        weight: 60
      }
    ]
  }
];

const StartWorkoutTemplatePage = () => {
  console.log('???????');
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    throw Error('SHOULD NOT BE HERE');
  }
  return (
    <PageContainer>
      <Header>Templates</Header>
      <div className="my-2"></div>
      <div className="flex-row md:px-40 lg:px-80 sm:px-10 bg-red-300">
        {templates.map((template) => (
          <Template {...template} key={template.id} />
        ))}
      </div>
    </PageContainer>
  );
};

export default StartWorkoutTemplatePage;
