import { FormEvent, useState } from 'react';
import { Comment } from '../hooks';
import { Avatar } from './Avatar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate, useParams } from 'react-router-dom';

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const handleComment = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/comment/${id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setComment('');
      navigate(0);
    }
  };
  return (
    <section className="max-w-screen-xl mx-auto   py-8 lg:py-16 antialiased">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold  dark:text-white">
            Discussion
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-20">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none  placeholder-gray-400 "
              placeholder="Write a comment..."
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={handleComment}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4  focus:ring-gray-900 hover:bg-gray-800"
          >
            Post comment
          </button>
        </form>
        <article className="p-6 text-base  rounded-lg space-y-8">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center mr-3 text-sm font-semibold ">
                    <Avatar
                      size="big"
                      name={comment.user.name || 'Anonymous'}
                    />
                  </div>
                  <span className="dark:text-white text-lg font-semibold">
                    {comment.user.name}
                  </span>
                </div>
              </footer>
              <p className="text-gray-800 dark:text-gray-200">
                {comment.comment}
              </p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
};
export default CommentSection;
