import { Link } from 'react-router-dom';
import { Avatar, Circle } from './Avatar';
import RenderEditorContent from './RenderEditorContent';
interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extralight dark:text-gray-100 pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 dark:text-slate-300 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2 dark:text-slate-50">
          {title}
        </div>
        <div className="text-md font-thin line-clamp-2">
          <RenderEditorContent
            data={JSON.parse(content)}
            type="card"
          ></RenderEditorContent>
        </div>
        <div className="text-slate-500 dark:text-slate-300 text-sm font-thin pt-4">
          {`${Math.ceil(content.length / 1000)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};
