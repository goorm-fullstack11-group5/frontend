import { CODE_SNIPPETS } from "@/constants/languages";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "./ThemeProvider";

interface CodeEditorProps {
  language: keyof typeof CODE_SNIPPETS;
  onMount: (editor: any, monaco: any) => void;
  onChange: (value: string | undefined) => void;
}

const CodeEditor = ({ language, onMount, onChange }: CodeEditorProps) => {
  const { theme } = useTheme();
  const editorTheme = theme === "dark" ? "vs-dark" : "light";
  return (
    <Editor
      height={"100%"}
      width={"100%"}
      theme={editorTheme}
      onMount={onMount}
      onChange={onChange}
      path='src/components/CodeEditor.tsx'
      language={language}
      value={CODE_SNIPPETS[language] || "// Write your code here"}
      defaultLanguage={language}
      defaultValue={CODE_SNIPPETS[language] || "// Write your code here"}
    />
  );
};

export default CodeEditor;
