import { OutputData } from '@editorjs/editorjs';

interface RenderEditorContentProps {
  data: OutputData;
  type: 'card' | 'singlePage';
}

const RenderEditorContent = ({ data, type }: RenderEditorContentProps) => {
  return (
    <div className="editor-content space-y-2 dark:text-white">
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case 'header': {
            const level = block.data.level;
            if (type == 'card') {
              return (
                <div key={index} className="">
                  {block.data.text}
                </div>
              );
            } else if (level == 1) {
              return (
                <h1 key={index} className="text-2xl font-bold ">
                  {block.data.text}
                </h1>
              );
            } else if (level == 2) {
              return (
                <h2 key={index} className="text-xl font-bold ">
                  {block.data.text}
                </h2>
              );
            } else if (level == 3) {
              return (
                <h3 key={index} className="text-lg font-bold ">
                  {block.data.text}
                </h3>
              );
            }
            return (
              <div key={index} className="">
                {block.data.text}
              </div>
            );
          }
          case 'paragraph':
            return (
              <p key={index} className="text-base">
                {block.data.text}
              </p>
            );
          case 'list':
            return (
              <ul key={index} className="list-disc">
                {block.data.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default RenderEditorContent;
