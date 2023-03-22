/** MAKE A username.json file and only add [] to it */


const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

async function generateUsername() {
  const word1 = getRandomWord();
  const word2 = getRandomWord();
  return `${word1}${word2}`;
}

function isUsernameTaken(username) {
  try {
    let takenUsernames = JSON.parse(fs.readFileSync('username.json'));
    return takenUsernames.includes(username);
  } catch (error) {
    console.error(`Error reading username.json: ${error}`);
    return false;
  }
}

function saveUsername(username) {
  try {
    let takenUsernames = JSON.parse(fs.readFileSync('username.json'));
    takenUsernames.push(username);
    fs.writeFileSync('username.json', JSON.stringify(takenUsernames));
  } catch (error) {
    console.error(`Error writing to username.json: ${error}`);
  }
}

async function suggestUsernames() {
  let suggestions = [];
  for (let i = 0; i < 3; i++) {
    let newUsername;
    do {
      newUsername = await generateUsername();
    } while (isUsernameTaken(newUsername));
    suggestions.push(newUsername);
    return suggestions;
  }
}
  rl.question('Enter a username: ', async (username) => {
    if (isUsernameTaken(username)) {
      console.log('Sorry, that username is already taken.');
      let suggestions = await suggestUsernames();
      console.log(`How about trying one of these instead: ${suggestions.join(', ')}`);
      rl.question('Choose one of the suggestions or enter a new username: ', (newUsername) => {
        if (isUsernameTaken(newUsername)) {
          console.log('Sorry, that username is also taken.');
        } else {
          console.log(`Great, ${newUsername} is available!`);
          saveUsername(newUsername);
        }
        rl.close();
      });
    } else {
      console.log(`Great, ${username} is available!`);
      saveUsername(username);
      rl.close();
    }
  });
