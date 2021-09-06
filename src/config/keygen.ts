import fs from 'fs';
import crypto from 'crypto';

const envPath = `${process.cwd()}/.env`;
fs.readFile(envPath, async (err, envFile) => {
  const key = await crypto.randomBytes(32).toString('hex');

  if (!envFile) {
    fs.readFile(`${process.cwd()}/.env.example`, async (error, example) => {
      let content = example.toString();
      const keyPosition = content.indexOf('APP_KEY=') + 8;
      const keyInserted = content.substring(0, keyPosition).concat(key);
      const rest = content.substring(keyPosition, content.length);

      content = keyInserted.concat(rest);

      fs.writeFile(envPath, content, e => {
        if (e) console.log(e);
      });
    });

    return;
  }

  let content = envFile.toString();
  if (envFile.indexOf('APP_KEY=') < 0) {
    const keyPosition = envFile.indexOf('\n');
    const keyInserted = content
      .substring(0, keyPosition)
      .concat(`\nAPP_KEY=${key}`);
    const rest = content.substring(keyPosition, content.length);

    content = keyInserted.concat(rest);

    fs.writeFile(envPath, content, e => {
      if (e) console.log(e);
    });

    return;
  }

  const keyPosition = content.indexOf('APP_KEY=') + 8;
  if (content.substring(keyPosition, keyPosition + 1).indexOf('\n') >= 0) {
    const keyInserted = content.substring(0, keyPosition).concat(key);
    const rest = content.substring(keyPosition, content.length);

    content = keyInserted.concat(rest);

    fs.writeFile(envPath, content, e => {
      if (e) console.log(e);
    });
  }
});
