import CodeEditor from "@/components/CodeEditor";
import FileList from "@/components/FileList";
import OutputWindow from "@/components/OutputWindow";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { CODE_SNIPPETS } from "@/constants/languages";
import { FileSystemItem } from "@/types/FileSystem";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

// const initialFiles = ["Main.java", "index.html", "README.md"];
const initialFileSystem: FileSystemItem[] = [
  {
    type: "folder",
    name: "src",
    path: "src",
    children: [
      { type: "file", name: "Main.java", path: "src/Main.java" },
      { type: "file", name: "index.html", path: "src/index.html" },
      {
        type: "folder",
        name: "components",
        path: "src/comps",
        children: [
          {
            type: "file",
            name: "Button.jsx",
            path: "src/components/Button.jsx",
          },
          {
            type: "file",
            name: "Header.jsx",
            path: "src/components/Header.jsx",
          },
        ],
      },
    ],
  },
  { type: "file", name: "README.md", path: "README.md" },
];
const projectName = "My Project";

interface FileContent {
  [key: string]: string;
}

const EditorPage = () => {
  const editorRef = useRef(null);
  const [fileSystem, setFileSystem] =
    useState<FileSystemItem[]>(initialFileSystem);
  const [language, setLanguage] = useState<keyof typeof CODE_SNIPPETS>("java");
  const [selectedFile, setSelectedFile] = useState("src/Main.java");
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");
  const [showFileList, setShowFileList] = useState(false);

  const [fileContents, setFileContents] = useState<FileContent>({
    "Main.java": "// Content of index.js",
    "style.css": "/* Content of style.css */",
    "app.js": "// Content of app.js",
  });

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const onSelect = (language: any) => {
    setLanguage(language);
  };

  const handleFileSelect = (file: string) => {
    setSelectedFile(file);
  };

  const handleFileCreate = (filePath: string) => {
    const pathParts = filePath.split("/");
    const fileName = pathParts.pop() || "";
    const parentPath = pathParts.join("/");

    const updateFileSystem = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.map((item) => {
        if (item.type === "folder" && item.path === parentPath) {
          return {
            ...item,
            children: [
              ...item.children,
              { type: "file", name: fileName, path: filePath },
            ],
          };
        } else if (item.type === "folder") {
          return {
            ...item,
            children: updateFileSystem(item.children),
          };
        }
        return item;
      });
    };

    setFileSystem((prev) =>
      parentPath
        ? updateFileSystem(prev)
        : [...prev, { type: "file", name: fileName, path: filePath }]
    );
    setFileContents((prev) => ({
      ...prev,
      [filePath]: `// Content of ${fileName}`,
    }));
  };

  const handleFileDelete = (filePath: string) => {
    const deleteFile = (items: FileSystemItem[]): FileSystemItem[] => {
      return items
        .filter((item) => item.path !== filePath)
        .map((item) => {
          if (item.type === "folder") {
            return {
              ...item,
              children: deleteFile(item.children),
            };
          }
          return item;
        });
    };

    setFileSystem((prev) => deleteFile(prev));
    setFileContents((prev) => {
      const newContents = { ...prev };
      delete newContents[filePath];
      return newContents;
    });

    if (selectedFile === filePath) {
      setSelectedFile(Object.keys(fileContents)[0]);
    }
  };

  const handleRunCode = () => {
    setOutput(`Output of ${selectedFile}:\n${fileContents[selectedFile]}`);
    setShowOutput(true);
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
        language={language}
        onSelect={onSelect}
        onToggleFileList={handleToggleFileList}
        showFileList={showFileList}
      />
      <Separator />
      <div className='flex w-full h-full'>
        {/* <div className='w-64 bg-background border-r'> */}
        {/* <div className='bg-background border-r cursor-col-resize'> */}
        <div className='hidden lg:block bg-background border-r cursor-col-resize w-64'>
          <FileList
            projectName={projectName}
            fileSystem={fileSystem}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onFileCreate={handleFileCreate}
            onFileDelete={handleFileDelete}
          />
        </div>

        <div className='flex-1 flex flex-col'>
          {/* <div className='p-2 bg-muted flex justify-end space-x-2'> */}
          <div className='hidden sm:flex p-2 bg-muted justify-end space-x-2'>
            <Button className='w-32'>
              <Play className='mr-2 h-4 w-4 rotate-180' /> Debug
            </Button>
            <Button className='w-32' onClick={handleRunCode}>
              <Play className='mr-2 h-4 w-4' /> Run Code
            </Button>
          </div>

          <div className='flex-[3] min-h-0'>
            <CodeEditor
              value={fileContents[selectedFile] || ""}
              language={language}
              onMount={handleEditorDidMount}
            />
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
