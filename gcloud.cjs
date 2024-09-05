// gcloud.ts (server)

const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const moment = require('moment-timezone');
const os = require('os');
const fs = require('fs');

const winOrLinux = os.platform() === 'win32' ? "win" : "linux";
console.log(`Activated OS is : ${winOrLinux}`);

// env 파일 수정 -----------------------------------------------------------------------------------
const modifyEnv = () => {

  // 파일을 줄 단위로 나눔
  const envFile = readFileSync('.env', 'utf8');
  const lines = envFile.split(/\r?\n/);

  const updatedLines = lines.map(line => {
    if (line.startsWith('CLIENT_URL=')) {
      return `CLIENT_URL=https://www.pajukaesong.com/PAJUKAESONG`;
    }
    if (line.startsWith('GOOGLE_CALLBACK_URL=')) {
      return `GOOGLE_CALLBACK_URL=https://www.pajukaesong.com/PAJUKAESONG/api/auth/google/callback`;
    }
    // 다른 줄은 그대로 유지
    return line;
  });

  // 줄을 다시 합쳐서 저장
  const newEnvFile = updatedLines.join(os.EOL);

  writeFileSync('.env', newEnvFile);
};

// changelog 수정 ----------------------------------------------------------------------------------
const modifyChangelog = () => {

  const currentDate = moment().tz("Asia/Seoul").format('YYYY-MM-DD');
  const currentTime = moment().tz("Asia/Seoul").format('HH:mm:ss');

  const changelog = fs.readFileSync('changelog.md', 'utf8');
  const versionPattern = /\d+\.\d+\.\d+/g;
  const matches = [...changelog.matchAll(versionPattern)];
  const lastMatch = matches[matches.length - 1];
  const versionArray = lastMatch[0].match(/\d+/g) || [];

  if (matches.length === 0) {
    throw new Error('버전 형식을 찾을 수 없습니다.');
  }

  if (versionArray.length < 3) {
    throw new Error('버전 형식이 잘못되었습니다. 세 자리 숫자가 필요합니다.');
  }

  // 세 번째 숫자에 +1
  versionArray[2] = (parseFloat(versionArray[2]) + 1).toString();

  const newVersion = `\\[ ${versionArray.join('.')} \\]`;
  const newDateTime = `- ${currentDate} (${currentTime})`;
  const newEntry = `\n## ${newVersion}\n\t${newDateTime}\n\n`;

  const updatedChangelog = changelog + newEntry;

  fs.writeFileSync('changelog.md', updatedChangelog, 'utf8');
};

// git push ----------------------------------------------------------------------------------------
const gitPush = () => {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "update"', { stdio: 'inherit' });
  execSync('git push origin master', { stdio: 'inherit' });
};

// 원격 서버에서 스크립트 실행 ---------------------------------------------------------------------
const runRemoteScript = () => {
  const keyPath = winOrLinux === "win" ? "C:\\Users\\jungh\\.ssh\\JKEY" : "~/ssh/JKEY";
  const serviceId = winOrLinux === "win" ? 'junghomun00' : 'junghomun1234';
  const ipAddr = "34.23.233.23";
  const cmdCd = 'cd /var/www/pajukaesong.com/PAJUKAESONG/server';
  const cmdGitFetch = 'sudo git fetch --all';
  const cmdGitReset = 'sudo git reset --hard origin/master';
  const cmdRmClient = 'sudo rm -rf client';
  const cmdNpm = 'sudo npm install';
  const cmdRestart = 'sudo pm2 restart all';
  const cmdSave = 'sudo pm2 save';

  const winCommand = `powershell -Command "ssh -i ${keyPath} ${serviceId}@${ipAddr} \'${cmdCd} && ${cmdGitFetch} && ${cmdGitReset} && ${cmdRmClient} && ${cmdNpm} && ${cmdRestart} && ${cmdSave}\'"
  `;
  const linuxCommand = `ssh -i ${keyPath} ${serviceId}@${ipAddr} \'${cmdCd} && ${cmdGitFetch} && ${cmdGitReset} && ${cmdRmClient} && ${cmdNpm} && ${cmdRestart} && ${cmdSave}\'`;

  const sshCommand = winOrLinux === "win" ? winCommand : linuxCommand;

  execSync(sshCommand, { stdio: 'inherit' });
};

// env 파일 복원 -----------------------------------------------------------------------------------
const restoreEnv = () => {

  // 파일을 줄 단위로 나눔
  const envFile = readFileSync('.env', 'utf8');
  const lines = envFile.split(/\r?\n/);

  const updatedLines = lines.map(line => {
    if (line.startsWith('CLIENT_URL=')) {
      return `CLIENT_URL=http://localhost:3000/PAJUKAESONG`;
    }
    if (line.startsWith('GOOGLE_CALLBACK_URL=')) {
      return `GOOGLE_CALLBACK_URL=http://localhost:4100/PAJUKAESONG/api/google/callback`;
    }
    // 다른 줄은 그대로 유지
    return line;
  });

  // 줄을 다시 합쳐서 저장
  const newEnvFile = updatedLines.join(os.EOL);

  writeFileSync('.env', newEnvFile);
};

// -------------------------------------------------------------------------------------------------
modifyEnv();
modifyChangelog();
gitPush();
runRemoteScript();
restoreEnv();