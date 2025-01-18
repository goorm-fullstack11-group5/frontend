import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface FileListProps {
  projectName: string;
  files: string[];
  onFileSelect: (file: string) => void;
  selectedFile: string;
}

const FileList = ({
  projectName,
  files,
  onFileSelect,
  selectedFile,
}: FileListProps) => {
  return (
    <div className='flex flex-col h-full'>
      {/* <div className='p-4 font-semibold text-lg border-b'>{projectName}</div> */}
      <div className='p-4 flex justify-between items-center'>
        <h2 className='font-semibold'>{projectName}</h2>
        <ThemeToggle />
      </div>
      <ScrollArea className='flex-1'>
        {files.map((file) => (
          <Button
            key={file}
            variant='ghost'
            className={cn(
              "w-full justify-start text-left font-normal",
              selectedFile === file && "bg-accent text-accent-foreground",
              "hover:bg-accent hover:text-accent-foreground transition-colors"
            )}
            onClick={() => onFileSelect(file)}
          >
            {file}
          </Button>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FileList;
