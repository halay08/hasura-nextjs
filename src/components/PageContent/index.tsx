import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
    marginTop: 50,
  },
}));

type Props = {
  children: React.ReactNode;
};

export default function PageContent({ children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}
