const crypto = require('node:crypto');
const readline = require('readline');

function generateTOTP(secret, timeStep = 30) {
  const time = Math.floor(Date.now() / 1000);
  let counter = Math.floor(time / timeStep);

  const counterBuffer = Buffer.alloc(8);
  for (let i = 0; i < 8; i++) {
    counterBuffer[7 - i] = counter & 0xff;
    counter >>= 8;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(counterBuffer);
  const hmacResult = hmac.digest();

  const offset = hmacResult[hmacResult.length - 1] & 0xf;
  let code =
    ((hmacResult[offset] & 0x7f) << 24) |
    ((hmacResult[offset + 1] & 0xff) << 16) |
    ((hmacResult[offset + 2] & 0xff) << 8) |
    (hmacResult[offset + 3] & 0xff);

  code %= Math.pow(10, 6);

  return code.toString().padStart(6, '0');
}

function formatTimeRemaining(timeRemaining) {
  const seconds = Math.floor(timeRemaining / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Example usage
const secret = 'SECRET_KEY';
const timeStep = 30;

let lastTOTP = '';
setInterval(() => {
  const time = Date.now();
  const elapsedSeconds = Math.floor(time / 1000) % timeStep;
  const remainingSeconds = timeStep - elapsedSeconds;
  const timeRemaining = remainingSeconds * 1000;
  const formattedTimeRemaining = formatTimeRemaining(timeRemaining);

  if (lastTOTP !== generateTOTP(secret, timeStep)) {
    console.log(`\nGenerated TOTP: ${generateTOTP(secret, timeStep)}\n`);
    lastTOTP = generateTOTP(secret, timeStep);
  }

  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`Next TOTP in: ${formattedTimeRemaining}`);
}, 1000);

