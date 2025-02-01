import { authInstance } from "@/api/api";
import CodeEditor from "@/components/CodeEditor";
import FileList from "@/components/FileList";
import OutputWindow from "@/components/OutputWindow";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useFileStore } from "@/hooks/useFileStore";
import { FileSystem } from "@/types/FileSystem";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EditorPage = () => {
  const editorRef = useRef(null);
  const [fileSystem, setFileSystem] = useState<FileSystem | null>(null);
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");
  const [showFileList, setShowFileList] = useState(false);
  const { isFileSystemUpdated, selectedFileId } = useFileStore();

  useEffect(() => {
    const fetchFileSystem = async () => {
      try {
        const response = await authInstance.get<FileSystem>("/api/projects/1");
        setFileSystem(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch file system:", error);
      }
    };

    fetchFileSystem();
  }, [isFileSystemUpdated]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleRunCode = async () => {
    if (fileSystem != null) {
      try {
        setOutput("Running code...");
        setShowOutput(true);

        const response = await authInstance.post(
          `/api/projects/${fileSystem.id}/files/${selectedFileId}/run`
        );

        setOutput(response.data.result);
      } catch (error) {
        setOutput("Failed to execute code.");
        console.error("Failed to run code:", error);
      }
    }
  };

  const handleCloseOutput = () => {
    setShowOutput(false);
  };

  const handleToggleFileList = () => {
    setShowFileList(!showFileList);
  };

  return (
    <div className='flex flex-col h-screen'>
      <TopBar
        onToggleFileList={handleToggleFileList}
        showFileList={showFileList}
      />
      <Separator />
      <div className='flex w-full h-full'>
        <div className='hidden lg:block bg-background border-r w-64'>
          {fileSystem && <FileList fileSystem={fileSystem} />}
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='hidden sm:flex p-2 bg-muted justify-end space-x-2'>
            <Button className='w-32' onClick={handleRunCode}>
              <Play className='mr-2 h-4 w-4' /> Run Code
            </Button>
          </div>

          <div className='flex-[3] min-h-0'>
            {fileSystem && (
              <CodeEditor
                projectId={fileSystem?.id.toString()}
                language={"java"}
                onMount={handleEditorDidMount}
              />
            )}
          </div>

          {showOutput && (
            <>
              <Separator />
              <OutputWindow output={output} onClose={handleCloseOutput} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
