import chalk from 'chalk';
import figlet from 'figlet';

const banner = () => {
  console.log(
    chalk.cyan(
      figlet.textSync('GIT LINT', {
        horizontalLayout: 'full',
      })
    )
  );
};

export default banner;
