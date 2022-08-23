const {redis}= require('redis');
import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();
export async function redisdb(){
  try {
    await client.connect();
    logger.info('Connected to the redis database.');
    // await client.set('key', 'value');
    // const value = await client.get('key');
    
    
  } catch (error) {
    // console.log('Redis Client Error', error);
    logger.error('Could not connect to the redis database.', error);
  }
};

// createClient({
//   url: 'redis://alice:foobared@awesome.redis.server:6380'
// });


