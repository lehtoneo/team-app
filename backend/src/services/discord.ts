import { MyContext, MyAuthContext } from './../types/MyContext';
import axios from 'axios';
import { Event } from '../models/Event';
import { User } from '../models/User';
import { UserEventAttendance } from '../models/UserEventAttendance';
import moment from 'moment';
import utils from '../util';

const trySendEventAttendanceChanged = async (
  webHookUrl: string,
  ctx: MyAuthContext,
  userEventAttendance: UserEventAttendance,
  event: Event
) => {
  const user = ctx.payload.user;
  const inOutText =
    userEventAttendance.attendance === true
      ? 'is attending event'
      : 'is not attending event';
  const eventLink = utils.getEventUrlFromEvent(ctx.req, event);
  const embedTitle = `${user.firstname} ${inOutText} "${event.name}" ${eventLink}`;
  const embedDescription =
    userEventAttendance.attendance === false && userEventAttendance.reason
      ? `Reason: ${userEventAttendance.reason}`
      : undefined;
  const requestBody = {
    content: 'Event attendance changed',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: embedTitle,
        description: embedDescription,
        color: 0x00ffff
      }
    ]
  };

  try {
    await axios.post(webHookUrl, requestBody);
  } catch (e) {
    console.log(e);
  }
};

const discordService = {
  trySendEventAttendanceChanged
};

export default discordService;
