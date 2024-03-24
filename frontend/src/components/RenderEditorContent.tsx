import { OutputData } from '@editorjs/editorjs';

const RenderEditorContent = ({ data }: { data: OutputData }) => {
  return (
    <div className="editor-content space-y-2 dark:text-white">
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            return (
              <h1 key={index} className="text-2xl font-bold ">
                {block.data.text}
              </h1>
            );
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
