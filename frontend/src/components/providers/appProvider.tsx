import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { OutputData } from '@editorjs/editorjs';

export type AppContextType = {
  editorContent: OutputData | null;
  setEditorContent: React.Dispatch<SetStateAction<OutputData | null>>;
};

export const AppContext = createContext<AppContextType | null>({
  editorContent: null,
  setEditorContent: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [editorContent, setEditorContent] = useState<OutputData | null>(null);
  console.log('editorContent: ', editorContent);
  return (
    <AppContext.Provider
      value={{
        editorContent,
        setEditorContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext) as AppContextType;
};

export default useApp;
