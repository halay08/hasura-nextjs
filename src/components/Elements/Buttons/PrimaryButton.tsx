import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

type PrimaryButtonProps = {
  children: any;
  className?: string;
  hanleClick?: (e: React.SyntheticEvent<EventTarget>) => void;
};

const useStyles = makeStyles({
  root: {
    boxShadow:
      '0px 18px 80px rgba(0, 0, 0, 0.07), 0px 4.02054px 17.869px rgba(0, 0, 0, 0.0551999), 0px 1.19702px 5.32008px rgba(0, 0, 0, 0.0485893)',
  },
});

export const PrimaryButton = ({
  children,
  className = '',
  hanleClick = () => false,
}: PrimaryButtonProps): JSX.Element => {
  const classes = useStyles();
  return (
    <button
      className={classNames([
        classes.root,
        'inline-block px-[22px] py-3 bg-yellow-100 rounded-3xl text-sm font-bold text-black-400 cursor-pointer text-center',
        className,
      ])}
      onClick={hanleClick}
    >
      {children}
    </button>
  );
};
