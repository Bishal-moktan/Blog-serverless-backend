import { Appbar } from '../components/Appbar';
import Editor from '../components/Editor';
import useDocumentTitle from '../hooks/useDocumentTitle';

const PublishPage = () => {
  useDocumentTitle('Blog - Create');
  return (
    <div className="min-h-screen">
      <Appbar />
      <Editor />
    </div>
  );
};
export default PublishPage;
