import { useNavigate } from 'react-router-dom';
import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useAuth, useBlogs } from '../hooks';

const Blogs = () => {
  const { loading, blogs, status: blogStatus } = useBlogs();
  const { status: userStatus, user } = useAuth();
  const navigate = useNavigate();
  if (blogStatus === 401 || userStatus === 401 || user === null) {
    navigate('/signin');
    console.log('User not found');
  }
  if (loading) {
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
          {blogs.map((blog) => (
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
