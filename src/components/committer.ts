import { exec } from 'child_process';

const commit = (msg: string) => {
  const command = `git commit -m "${msg}"`;
  exec(command, (stderr) => {
    console.log(
      stderr ? 'Commit não realizado.' : 'Commit realizado, realize o push.'
    );
  });
};

export default commit;
