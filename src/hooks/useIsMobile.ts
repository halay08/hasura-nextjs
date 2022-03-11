import { configResponsive, useResponsive } from 'ahooks';
import _get from 'lodash.get';
import { useEffect, useState } from 'react';

configResponsive({
  md: 768,
});

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  const responsive = useResponsive();

  useEffect(() => {
    if (responsive) {
      setIsMobile(!_get(responsive, 'md', true));
    }
  }, [responsive]);

  return isMobile;
};
