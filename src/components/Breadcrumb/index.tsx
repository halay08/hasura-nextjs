import { useIsMobile } from '@/hooks/useIsMobile';
import { Breadcrumbs, Link } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import classnames from 'classnames';
import { useMemo, useRef } from 'react';
import { useStyles } from './useStyles';

const RIGHT_GAP = 70;

type Props = {
  breadcrumbs: Array<{ label: string; link: string }>;
  hasFavorite?: boolean;
};

const Breadcrumb = ({ breadcrumbs, hasFavorite }: Props): JSX.Element => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const classes = useStyles();

  const isOverlap = useMemo(() => {
    if (ref && ref.current) {
      const elWidth = ref.current.clientWidth - RIGHT_GAP;
      const childWidth = ref.current.firstElementChild.clientWidth;
      return childWidth > elWidth;
    }
    // eslint-disable-next-line
  }, [ref.current]);

  const breadCrumbClasses = classnames(classes.root, {
    [classes.overlap]: isMobile && isOverlap,
  });

  if (!breadcrumbs) return <></>;

  return (
    <div className="w-full relative block my-2">
      <Breadcrumbs
        ref={ref}
        separator={<ArrowForwardIcon className={classes.icon} />}
        aria-label="breadcrumb"
        classes={{
          root: breadCrumbClasses,
        }}
      >
        {breadcrumbs.map(({ link = '', label = '' }) => (
          <Link key={`bcr-label`} underline="hover" color="inherit" href="#">
            <span className="text-sm font-bold text-black-100">{label}</span>
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
