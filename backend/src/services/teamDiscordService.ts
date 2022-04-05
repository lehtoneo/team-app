import { getRandomTrollReason } from './../util/trollReasons';
import { TeamSettings } from '../models/TeamSettings';
import { MyContext } from '../types/MyContext';
import axios from 'axios';
import { Event } from '../models/Event';
import { UserEventAttendance } from '../models/UserEventAttendance';
import utils from '../util';

// only sends messages if discord webhook is setup in team setting
export class TeamDiscordService {
  teamSettings: TeamSettings;
  ctx: MyContext;

  constructor(teamSettings: TeamSettings, ctx: MyContext) {
    this.teamSettings = teamSettings;
    this.ctx = ctx;
  }
  isSendingAllowed(): boolean {
    return (
      this.teamSettings.discordNotificationsOn &&
      this.teamSettings.discordWebhookUrl !== undefined
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async trySendIfAllowed(data: any) {
    if (
      this.teamSettings.discordNotificationsOn &&
      this.teamSettings.discordWebhookUrl
    ) {
      try {
        await axios.post(this.teamSettings.discordWebhookUrl, data);
      } catch (e) {
        console.log(e);
      }
    }
  }
  async trySendEventCreated(event: Event) {
    const user = this.ctx.payload.user;
    if (!user || !this.isSendingAllowed()) return;

    const eventLink = utils.getEventUrlFromEvent(this.ctx.req, event);
    const embedTitle = `"${event.name}" created by ${user.firstname}`;
    const embedDescription = `Mark your attendance at ${eventLink}`;
    const requestBody = {
      content: 'Event created',
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

    await this.trySendIfAllowed(requestBody);
  }

  async trySendEventAttendanceChanged(
    userEventAttendance: UserEventAttendance,
    event: Event
  ) {
    const user = this.ctx.payload.user;
    if (!user || !this.isSendingAllowed()) return;

    const inOutText =
      userEventAttendance.attendance === true
        ? 'is attending event'
        : 'is not attending event';
    const eventLink = utils.getEventUrlFromEvent(this.ctx.req, event);
    const embedTitle = `${user.firstname} ${inOutText} "${event.name}" ${eventLink}`;
    const reason = this.teamSettings.trollMessages
      ? getRandomTrollReason()
      : userEventAttendance.reason || 'none';
    const embedDescription =
      (userEventAttendance.attendance === false && `Reason: ${reason}`) ||
      undefined;
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

    await this.trySendIfAllowed(requestBody);
  }
}

export default TeamDiscordService;
