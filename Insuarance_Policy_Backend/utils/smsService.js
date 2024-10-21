import twilio from 'twilio'; // Uncomment this if you're using Twilio

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID // Replace with your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Function to send SMS notification
export const sendSMSNotification = async (to, message) => {
    try {
        const sms = await client.messages.create({
            body: message,
            from: '8010817595', // Replace with your Twilio phone number
            to: to,
        });

        console.log(`SMS sent to ${to}: ${sms.sid}`);
    } catch (error) {
        console.error(`Failed to send SMS to ${to}: ${error.message}`);
    }
};
