import CodeEditor from "@/components/CodeEditor";
import FileList from "@/components/FileList";
import LanguageSelector from "@/components/LanguageSelector";
import OutputWindow from "@/components/OutputWindow";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { CODE_SNIPPETS } from "@/constants/languages";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

const initialFiles = ["Main.java", "index.html", "README.md"];
const projectName = "My Project";

const EditorPage = () => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState<keyof typeof CODE_SNIPPETS>("java");
  const [value, setValue] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState(initialFiles[0]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const handleOnChange = (code: string | undefined) => {
    const updatedValue = code || "";
    setValue(updatedValue);
    console.log(updatedValue);
  };

  const onSelect = (language: any) => {
    setLanguage(language);
  };

  const handleFileSelect = (file: string) => {
    setSelectedFile(file);
    // Here you would typically load the content of the selected file
    // setCode(`// Content of ${file}`);
  };

  return (
    <div className='flex flex-col h-screen'>
      
      <TopBar language={language} onSelect={onSelect} />
      <Separator />
      <div className='flex w-full h-full'>
        <div className='w-48 bg-background border-r'>
          <FileList
            projectName={projectName}
            files={initialFiles}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='flex-[3] min-h-0'>
            <CodeEditor
              language={language}
              onMount={handleEditorDidMount}
              onChange={handleOnChange}
            />
          </div>
          <div className='p-2 bg-muted'>
            <Button className='w-full'>
              <Play className='mr-2 h-4 w-4' /> Run Code
            </Button>
          </div>
          <Separator />
          <div className='flex-[2] min-h-0'>
            <OutputWindow output='code execution...' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
