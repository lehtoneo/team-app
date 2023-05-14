import AppDataSource from '../data-source';
import { Exercise, ExerciseTarget } from '../models/ExerciseModels';

const exerciseRepository = AppDataSource.getRepository(Exercise);
const exerciseTargetRepository = AppDataSource.getRepository(ExerciseTarget);
const seedExercises = async (reset: boolean) => {
  if (reset) {
    await exerciseTargetRepository.delete({});
    await exerciseRepository.delete({});
    await exerciseRepository.query('ALTER SEQUENCE exercise_id_seq RESTART');
    await exerciseTargetRepository.query(
      'ALTER SEQUENCE exercise_target_id_seq RESTART'
    );
  }
  const targets = ['Chest', 'Triceps', 'Shoulders', 'Back', 'Biceps', 'Legs'];
  const targetEntities = await Promise.all(
    targets.map(async (target) => {
      try {
        const newTarget = await exerciseTargetRepository
          .create({ name: target, id: targets.indexOf(target) + 1 })
          .save();
        return newTarget;
      } catch (e) {
        console.log(e);
      }
    })
  );

  const exercises = ['Bench press', 'Squat', 'Deadlift', 'Overhead press'];
  const exerciseEntities = await Promise.all(
    exercises.map(async (exercise) => {
      try {
        const newExercise = await exerciseRepository
          .create({ name: exercise })
          .save();
        return newExercise;
      } catch (e) {
        console.log('e');
      }
    })
  );
  return exerciseEntities;
};

interface SeedParams {
  resetExcercises: boolean;
}

const seed = async (params: SeedParams) => {
  console.log('Seeding');
  await seedExercises(params.resetExcercises);
  console.log('Seeding complete');
};

const seeder = {
  seed
};

export default seeder;
