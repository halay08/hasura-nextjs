import classnames from 'classnames';
import { ReactSVG } from 'react-svg';

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

export const Logo = ({
  width = '64px',
  height = '64px',
  className = '',
}: Props): JSX.Element => {
  return (
    <div
      className={classnames(
        'flex items-center font-rubik text-lg font-bold',
        className,
      )}
    >
      <ReactSVG src="images/logo.svg" />
    </div>
  );
};
