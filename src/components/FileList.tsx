import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import FileIcon from "./FileIcon";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FileListProps {
  projectName: string;
  files: string[];
  onFileSelect: (file: string) => void;
  selectedFile: string;
  onFileCreate: (fileName: string) => void;
  onFileDelete: (fileName: string) => void;
}

const FileList = ({
  projectName,
  files,
  onFileSelect,
  selectedFile,
  onFileCreate,
  onFileDelete,
}: FileListProps) => {
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const handleCreateFile = () => {
    setIsCreateDialogOpen(true);
  };

  const confirmCreateFile = () => {
    if (newFileName) {
      onFileCreate(newFileName);
      setNewFileName("");
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteFile = (file: string) => {
    setFileToDelete(file);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      onFileDelete(fileToDelete);
      setFileToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* <div className='p-4 font-semibold text-lg border-b'>{projectName}</div> */}
      <div className='p-4 flex justify-between items-center'>
        <h2 className='font-semibold'>{projectName}</h2>
        <ThemeToggle />
      </div>
      <div className='px-4 mb-2'>
        <Button onClick={handleCreateFile} className='w-full'>
          <Plus className='mr-2 h-4 w-4' /> New File
        </Button>
      </div>
      <ScrollArea className='flex-1'>
        {files.map((file) => (
          <div
            key={file}
            className='relative'
            onMouseEnter={() => setHoveredFile(file)}
            onMouseLeave={() => setHoveredFile(null)}
          >
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
              <FileIcon fileName={file} />
              {file}
            </Button>
            {hoveredFile === file && (
              <Button
                variant='ghost'
                size='icon'
                className='absolute right-2 top-1/2 transform -translate-y-1/2'
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file);
                }}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>
        ))}
      </ScrollArea>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>파일 삭제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              {fileToDelete}을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수
              없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 파일 생성</DialogTitle>
            <DialogDescription>
              새로 생성할 파일의 이름을 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder='파일 이름'
          />
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsCreateDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={confirmCreateFile}>생성</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileList;
