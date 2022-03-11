import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiBreadcrumbs-ol': {
      flexWrap: 'nowrap',
    },
    '& .MuiBreadcrumbs-separator': {
      margin: '0 5px',
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      padding: '14px 30px',
    },
  },
  overlap: {
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 35,
      background: `linear-gradient(to right, ${theme.colors.white.main}, ${theme.colors.white[100]})`,
      zIndex: 10,
    },
    '& .MuiBreadcrumbs-ol': {
      position: 'absolute',
      right: 70,
    },
  },
  icon: {
    fontSize: 14,
    color: theme.colors.black[100],
  },
}));