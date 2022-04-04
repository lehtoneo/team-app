import { Event } from '../models/Event';
import { Request } from 'express';
const getEventUrlFromEvent = (req: Request, event: Event) => {
  const baseUrl = 'https://' + req.get('host') + '/#';
  const path = `/teams/${event.teamId}/events/${event.id}`;
  const url = baseUrl + path;

  return url;
};

const utils = {
  getEventUrlFromEvent
};

export default utils;
