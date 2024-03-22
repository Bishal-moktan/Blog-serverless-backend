import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Signup from './pages/Signup.tsx';
import Signin from './pages/Signin.tsx';
import { Blog } from './pages/Blog.tsx';
import Blogs from './pages/Blogs.tsx';
import Publish from './pages/Publish.tsx';

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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
