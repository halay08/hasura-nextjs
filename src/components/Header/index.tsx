import { Logo } from '@/components/Logo';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';

export const Header = (): JSX.Element => {
  return (
    <div className="w-full h-fit flex justify-between items-center font-rubik pl-0 pr-3 md:px-[30px]">
      <div className="hidden md:flex justify-start items-center font-inter text-[15px] font-bold text-black-100"></div>
      <div className="inline-block">
        <Link href="#" passHref>
          <span className="cursor-pointer">
            <Logo />
          </span>
        </Link>
      </div>
      <div className="inline-block">
        <div
          className="'w-9 h-9 flex md:hidden justify-center items-center rounded-full'"
        >
          <MenuIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Header;
