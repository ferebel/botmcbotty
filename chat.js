const { Configuration, OpenAIApi } = require("openai");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Initialize the OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize the Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: true,
    polling_interval: 3000,
    timeout: 10,
});

// Handle incoming messages
bot.on("message", async (msg) => {
  try {
    // Use the OpenAI API to generate a response to the message
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msg.text,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Send the response back to the user
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
  }
});
