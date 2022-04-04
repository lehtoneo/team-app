import moment from 'moment';

export const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateMoment = moment(date);
  const iscurrentDate = dateMoment.isSame(new Date(), 'day');
  const hoursAndMins = dateMoment.format('HH:mm');
  if (iscurrentDate) {
    return `Today at ${hoursAndMins}`;
  } else {
    const dayMonthYear = dateMoment.format('DD.MM.yyyy');
    return `${dayMonthYear} at ${hoursAndMins}`;
  }
};