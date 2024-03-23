import { Appbar } from '../components/Appbar';
import Editor from '../components/Editor';
import useDocumentTitle from '../hooks/useDocumentTitle';

const PublishPage = () => {
  useDocumentTitle('Blog - Create');
  return (
    <div>
      <Appbar />
      <Editor />
    </div>
  );
};
export default PublishPage;
