const subjects: string[] = [
  'My uncle',
  'My dog',
  'My wife',
  'My dad',
  'My neighbor',
  'A donkey',
  'The old man who secretly lives in my attic',
  'My cat',
  'A cool lizard'
];

const actions: string[] = [
  'ate a piece of chalck and',
  'got drunk and',
  'climbed up a tree and',
  'keeps yelling racial slurs at kids and',
  'gave birth in the back of my car and',
  // eslint-disable-next-line quotes
  "hid my car keys in a bird's nest and",
  'won`t stop crying and',
  'hid my alarm clock and',
  'filled my car with bats and',
  'is teaching me karate and'
];

const consequences: string[] = [
  'I can`t feel my face anymore',
  'I think I`m pregnant',
  'I can`t stop crying',
  'I just want to die',
  'I think I should try meth',
  'I need to unfriend everyone on Facebook',
  'I have to find a new place to live',
  'now there is blood everywhere'
];

export const getRandomTrollReason = () => {
  const randomSubjectIndex = Math.floor(Math.random() * subjects.length);
  const randomSubject = subjects[randomSubjectIndex];
  const randomActionsIndex = Math.floor(Math.random() * actions.length);
  const randomAction = actions[randomActionsIndex];
  const randomConseqIndex = Math.floor(Math.random() * consequences.length);
  const randomConsequence = consequences[randomConseqIndex];

  return `${randomSubject} ${randomAction} ${randomConsequence}.`;
};
