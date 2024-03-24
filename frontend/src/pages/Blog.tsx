import { Appbar } from '../components/Appbar';
import { FullBlog } from '../components/FullBlog';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import CommentSection from '../components/Comment';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { blogSelectorFamily } from '../store/blogAtom';
import { commentSelectorFamily } from '../store/commentAtom';
import { userAtom } from '../store/userAtom';

export const Blog = () => {
  const { id } = useParams();
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  if (user === null) {
    navigate('/signin');
  }
  const blog = useRecoilValue(blogSelectorFamily(id || ''));
  useDocumentTitle(blog?.title || 'Blog');
  const commentsLoadable = useRecoilValueLoadable(
    commentSelectorFamily(id || '')
  );

  if (!blog) {
    return (
      <div>
        <Appbar />

        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <FullBlog blog={blog} />
      {commentsLoadable.state == 'loading' && (
        <div className="flex justify-center items-center h-[20vh]">
          <Spinner />
        </div>
      )}
      {commentsLoadable.state == 'hasValue' && (
        <CommentSection comments={commentsLoadable.contents} />
      )}
    </div>
  );
};
