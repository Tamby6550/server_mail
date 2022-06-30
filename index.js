const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '501158639303-fd2ss9dhrg4o0g0ag23pc3jlu2la6v5m.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04X8jeCFWHKhHCgYIARAAGAQSNwF-L9IrXN_e4Loo0Qi3ndlIA8Ihlhtex4Sm_1JBmtd5q4r6REUB2roOWUZTTZrVqCpz6nAx12E';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'recensement301@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Recensement <recensement301@gmail.com>',
      to: 'recensement301@gmail.com',
      subject: 'Liste Recensement',
      text: 'Liste recensement', 
      html: '<h1>Hello from gmail email using API</h1>',
      attachments: [
        {   
            filename: 'donne.xlsx',
            path:'./assets/donne.xlsx'
        }]
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));