import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
//@ts-expect-error no typescript declaration found
import List from '@editorjs/list';
import { useEffect, useRef, useState } from 'react';
import useApp from './providers/appProvider';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import '../editor.css';

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'This is my awesome editor!',
        level: 1,
      },
    },
  ],
};

const Editor = () => {
  const { setEditorContent } = useApp();
  const [title, setTitle] = useState('');
  const ejInstance = useRef<EditorJS | null>(null);
  const [content, setContent] = useState<OutputData | null>(null);
  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const tempContent = await editor.saver.save();
        setContent(tempContent);
      },
      tools: {
        header: Header,
        list: List,
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);
  const navigate = useNavigate();
  const handlePublish = async () => {
    setEditorContent(content);
    console.log('editorContent: ', JSON.stringify(content));
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content: JSON.stringify(content),
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    navigate(`/blog/${response.data.newPost.id}`);
  };
  return (
    <div className="w-full md:w-[50vw] mx-auto space-y-4 mt-4">
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
        placeholder="Title"
      />
      <div id="editorjs" className="border-gray-400 border-2  rounded-md"></div>
      <button
        onClick={handlePublish}
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
      >
        Publish
      </button>
    </div>
  );
};
export default Editor;
