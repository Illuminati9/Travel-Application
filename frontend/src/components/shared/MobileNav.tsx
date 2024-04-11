import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import TopBar from './Topbar';
import NavItems from './NavItems';
import { Link } from 'react-router-dom';

const MobileNv = () => {
  return (
    <div className="m-1 md:m-2 flex justify-between  md:hidden">
      <Sheet>
        <SheetTrigger>
          <svg
            className="w-6 h-6 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </SheetTrigger>
        <SheetContent
          className="w-[300px] flex flex-col gap-6 bg-white overflow-auto md:hidden"
          side={'left'}
        >
          <SheetTitle>
            <Link
              to={'/'}
              className="flex items-center p-2 text-gray-900 rounded-lg"
            >
              <span className="ms-3 font-bold text-2xl">
                Travel application
              </span>
            </Link>{' '}
          </SheetTitle>
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
      <TopBar />
    </div>
  );
};

export default MobileNv;
