import * as chalk from 'chalk';
import * as figlet from 'figlet';

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
