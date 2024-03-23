import { Appbar } from '../components/Appbar';
import { FullBlog } from '../components/FullBlog';
import Spinner from '../components/Spinner';
import { useBlog, useComment } from '../hooks';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import CommentSection from '../components/Comment';

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || '',
  });
  useDocumentTitle(blog?.title || 'Blog');

  const { comments } = useComment({
    id: id || '',
  });

  if (loading || !blog) {
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
    <div>
      <FullBlog blog={blog} />
      <CommentSection comments={comments} />
    </div>
  );
};
