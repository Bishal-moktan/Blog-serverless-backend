import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';
import { LuSun, LuMoonStar } from 'react-icons/lu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appAtom } from '../store/appAtom';
import { userAtom } from '../store/userAtom';

export const Appbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  const user = useRecoilValue(userAtom);
  const [dark, setDark] = useRecoilState(appAtom);
  const handleToggleMode = () => {
    setDark(!dark);
    const currentMode = localStorage.getItem('theme');
    const updatedMode = currentMode === 'dark' ? 'white' : 'dark';
    localStorage.setItem('theme', updatedMode);
  };
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={'/blogs'}
        className="flex flex-col justify-center cursor-pointer text-2xl font-bold dark:text-white"
      >
        Medium
      </Link>
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer" onClick={handleToggleMode}>
          {dark ? (
            <LuSun className="size-6 dark:text-white" />
          ) : (
            <LuMoonStar className="size-6 dark:text-white" />
          )}
        </div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
          >
            New
          </button>
        </Link>

        <Avatar size={'big'} name={user?.name || 'Anonymous'} />
        <button
          type="button"
          onClick={handleLogout}
          className="text-white bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
        >
          Logout
        </button>
      </div>
    </div>
  );
};
