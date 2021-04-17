import axios from 'axios';
import settings from '../settings';

export async function handler(event, context) {
  const { STRAVA_SECRET_KEY } = process.env;
  const url = settings.makeStravaTokenExchangeUrl('x', 'y');

  return {
      statusCode: 200,
      body: JSON.stringify({ event, context, STRAVA_SECRET_KEY })
  };
}
