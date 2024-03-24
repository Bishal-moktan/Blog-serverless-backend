import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Signup from './pages/Signup.tsx';
import Signin from './pages/Signin.tsx';
import { Blog } from './pages/Blog.tsx';
import Blogs from './pages/Blogs.tsx';
import Publish from './pages/Publish.tsx';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { appAtom } from './store/appAtom.ts';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <Blogs />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/blog/:id',
    element: <Blog />,
  },
  {
    path: '/blogs',
    element: <Blogs />,
    index: true,
  },
  {
    path: '/publish',
    element: <Publish />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

export default App;

const MainApp = () => {
  const dark = useRecoilValue(appAtom);
  return (
    <div className={`${dark ? 'dark' : ''} min-h-screen `}>
      <div className="dark:bg-gray-700 transition-all duration-300">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};
