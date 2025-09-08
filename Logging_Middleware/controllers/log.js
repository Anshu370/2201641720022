import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_TOKEN = process.env.AUTH_TOKEN;

 /**
  * Sends log data to Affordmed log API
  */

//  Log Levels: 'info', 'warn', 'error', 'debug', 'fatal

// function parameters: stack, level, package, message
// function uses to send a POST request to the Affordmed log API endpoint with the provided parameters
async function logToAffordmed(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      {
        stack,
        level,
        "package": pkg,
        message
      },
      {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Log sent successfully:', response.data);
  } catch (error) {
    console.error('❌ Failed to send log:', error.response?.data || error.message);
  }
}

export default logToAffordmed;
