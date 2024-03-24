import { useRecoilValueLoadable } from 'recoil';
import { Appbar } from '../components/Appbar';
import Editor from '../components/Editor';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { userAtom } from '../store/userAtom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PublishPage = () => {
  const userLoadable = useRecoilValueLoadable(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (userLoadable.contents === null) {
      navigate('/signin');
    }
  }, [userLoadable.state]);
  useDocumentTitle('Blog - Create');
  return (
    <div className="min-h-screen">
      <Appbar />
      <Editor />
    </div>
  );
};
export default PublishPage;
