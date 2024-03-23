import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { useAuth } from '../hooks';

export const Appbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };
  const { user } = useAuth();
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={'/blogs'}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div className="space-x-2">
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>

        <Avatar size={'big'} name={user?.name || 'Anonymous'} />
        <button
          type="button"
          onClick={handleLogout}
          className="text-white bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Logout
        </button>
      </div>
    </div>
  );
};
