import { useNavigate } from 'react-router-dom';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/userAtom';
import { blogsAtom } from '../store/blogAtom';
import { useEffect } from 'react';

const Blogs = () => {
  const blogsLoadable = useRecoilValueLoadable(blogsAtom);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate('/signin');
    }
  }, [blogsLoadable.state]);

  if (blogsLoadable.state === 'loading') {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-dark-800 min-h-screen">
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogsLoadable.state === 'hasValue' &&
            blogsLoadable.contents.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || 'Anonymous'}
                title={blog.title}
                content={blog.content}
                publishedDate={'2nd Feb 2024'}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
