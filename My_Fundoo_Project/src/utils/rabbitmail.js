import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

 
// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
 
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
 
export async function rabbitmail(UserMail) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    console.log("Inside rabbit mail : ",UserMail);
 
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAILUSER,
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
 
    const mailOptions = {
      from: process.env.MAILUSER,
      to: UserMail,
      subject: 'Hello from gmail using API',
      text: 'This is the testing gmail email using API',
      html: '<h1>This is the testing gmail email using API Check the rabbitmq mail </h1>',
    };
    const result = await transport.sendMail(mailOptions);
    return result;
 
  } catch (error) {
    return error;
  }
};


