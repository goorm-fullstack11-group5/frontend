import { CODE_SNIPPETS } from "@/constants/languages";
import { Editor, OnMount } from "@monaco-editor/react";
import { useTheme } from "./ThemeProvider";
import { useFileStore } from "@/hooks/useFileStore";
import { useCallback, useEffect, useState } from "react";
import { authInstance } from "@/api/api";
import { debounce } from "lodash";

interface CodeEditorProps {
  projectId: string | undefined;
  language: keyof typeof CODE_SNIPPETS;
  onMount: OnMount;
}

const CodeEditor = ({ projectId, language, onMount }: CodeEditorProps) => {
  const { theme } = useTheme();
  const editorTheme = theme === "dark" ? "vs-dark" : "light";
  const { selectedFileId, selectedFileName } = useFileStore();
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const fetchFileContent = async () => {
      if (!projectId || !selectedFileId) return;
      try {
        const response = await authInstance.get(
          `/api/projects/${projectId}/files/${selectedFileId}`
        );
        setCode(response.data.content);
      } catch (error) {
        console.error("파일을 불러오는 중 오류 발생:", error);
      }
    };

    fetchFileContent();
  }, [projectId, selectedFileId]);

  const debouncedSave = useCallback(
    debounce(async (updatedCode: string) => {
      if (!projectId || !selectedFileId) return;
      try {
        await authInstance.patch(
          `/api/projects/${projectId}/files/${selectedFileId}`,
          {
            name: selectedFileName,
            content: updatedCode,
          }
        );
        console.log("자동 저장 완료");
      } catch (error) {
        console.error("파일 저장 중 오류 발생:", error);
      }
    }, 1000),
    [selectedFileId]
  );

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
      debouncedSave(newCode);
    }
  };

  return (
    <Editor
      height={"100%"}
      width={"100%"}
      theme={editorTheme}
      onMount={onMount}
      onChange={handleCodeChange}
      path={selectedFileId ? `file://${selectedFileId}` : undefined}
      language={language}
      value={code || "// Write your code here"}
      defaultLanguage={language}
    />
  );
};

export default CodeEditor;
