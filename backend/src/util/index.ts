import { Event } from '../models/Event';
import { Request } from 'express';
import { config } from '../config';

const { NODE_ENV } = config;
const getEventUrlFromEvent = (req: Request, event: Event) => {
  const urlStart = NODE_ENV === 'dev' ? 'http://' : 'https://';
  const baseUrl = urlStart + req.get('host') + '/#';
  const path = `/teams/${event.teamId}/events/${event.id}`;
  const url = baseUrl + path;

  return url;
};

const utils = {
  getEventUrlFromEvent
};

export default utils;
