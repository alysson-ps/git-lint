import { cyan } from 'chalk';
import { textSync } from 'figlet';

const banner = () => {
  console.log(
    cyan(
      textSync('GIT LINT', {
        horizontalLayout: 'full',
      })
    )
  );
};

export default banner;
