import { exec } from 'child_process';

const pusher = (branch: string) => {
  const command = `git push -u origin ${branch}`;
  exec(command, (stderr) => {
    console.log(
      stderr ? 'Push não foi realizado.' : 'Push realizado.'
    );
  });
}

export default pusher;