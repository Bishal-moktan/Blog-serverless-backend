import './App.css';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Signup from './pages/Signup.tsx';
import Signin from './pages/Signin.tsx';
import { Blog } from './pages/Blog.tsx';
import Blogs from './pages/Blogs.tsx';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { appAtom } from './store/appAtom.ts';
import PrivateRoutes from './components/ProtectedRoute.tsx';
import PublishPage from './pages/Publish.tsx';
import Authenticated from './components/Authenticated.tsx';

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
    <div className={`${dark ? 'dark' : ''}`}>
      <div className="dark:bg-gray-700 transition-all duration-300">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Blogs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/publish" element={<PublishPage />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route element={<Authenticated />}>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
};
