const mineflayer = require('mineflayer');

// Define the bot's username and password
const botUsername = 'AFKbot'; // Your bot's username
const password = 'NIGGER';       // Your bot's password

let bot = mineflayer.createBot({
  host: 'PLUMSMP.aternos.me', // Server IP
  port: 12862,                    // Server port
  username: botUsername,          // Bot's name (do not change here)
  version: '1.16.4'               // Server version
});

// Function to set up event listeners for the bot
function setupEventListeners(bot) {
  // Bot spawn event
  bot.on('spawn', () => {
    console.log('Bot has spawned in the game.');

    // Send register command
    bot.chat(`/register ${botUsername} ${password}`);
    console.log(`Sent register command: /register ${botUsername} ${password}`);

    // Wait for a moment before sending the login command
    setTimeout(() => {
      bot.chat(`/login ${botUsername} ${password}`);
      console.log(`Sent login command: /login ${botUsername} ${password}`);
    }, 2000); // 2 seconds delay

    // Start random movement
    randomMovement();
  });

  // Handle chat messages
  bot.on('chat', (username, message) => {
    if (username === bot.username) return; // Ignore own messages

    // Example chat commands
    if (message === 'hi') {
      bot.chat(`Hello, ${username}!`);
    } else if (message === 'move') {
      bot.setControlState('forward', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
      }, 3000); // Move forward for 3 seconds
    }
    // Add more commands as needed
  });

  // Error handling
  bot.on('error', (err) => {
    console.error('Bot encountered an error:', err.message);
  });

  // Bot disconnect event
  bot.on('end', () => {
    console.log('Bot has disconnected.');
    reconnect(); // Attempt to reconnect on disconnect
  });
}

// Function for random movement (example)
function randomMovement() {
  setInterval(() => {
    const randomDirection = Math.random() < 0.5 ? 'forward' : 'back';
    bot.setControlState(randomDirection, true);
    setTimeout(() => {
      bot.setControlState(randomDirection, false);
    }, 2000);
  }, 5000); // Every 5 seconds
}

// Function to reconnect the bot
function reconnect() {
  console.log('Attempting to reconnect...');
  bot = mineflayer.createBot({
    host: 'YOURSERVERIP',
    port: 22382,
    username: 'BOTUSERNAME',
    version: '1.16.4'
  });

  setupEventListeners(bot); // Reattach event listeners
}

// Initial setup
setupEventListeners(bot);
