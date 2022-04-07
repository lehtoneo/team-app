import moment from 'moment';

export const formatEventDate = (eventDateString: string) => {
  const eventDate = new Date(eventDateString);
  const dateMoment = moment(eventDate);
  const iscurrentDate = dateMoment.isSame(new Date(), 'day');
  const hoursAndMins = dateMoment.format('HH:mm');

  const tomorrowMoment = moment().add(1, 'days');
  const isTomorrow = tomorrowMoment.isSame(eventDate, 'day');
  if (iscurrentDate) {
    return `Today at ${hoursAndMins}`;
  } else if (isTomorrow) {
    return `Tomorrow at ${hoursAndMins}`;
  } else {
    const dayMonthYear = dateMoment.format('DD.MM.yyyy');
    return `${dayMonthYear} at ${hoursAndMins}`;
  }
};
