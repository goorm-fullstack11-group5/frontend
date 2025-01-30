import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "./ThemeToggle";
import { Plus } from "lucide-react";
import type { FileSystemItem as IFileSystemItem } from "@/types/FileSystem";
import FileSystemItem from "./FileSystemItem";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

import DeleteFileDialog from "./Dialog/DeleteFileDialog";
import CreateFileDialog from "./Dialog/CreateFileDialog";

interface FileListProps {
  projectName: string;
  fileSystem: IFileSystemItem[];
  onFileSelect: (filePath: string) => void;
  selectedFile: string;
  onFileCreate: (filePath: string) => void;
  onFileDelete: (filePath: string) => void;
}

const FileList = ({
  projectName,
  fileSystem,
  onFileSelect,
  selectedFile,
  onFileCreate,
  onFileDelete,
}: FileListProps) => {
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemParentPath, setNewItemParentPath] = useState("");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );
  const [width, setWidth] = useState(256);

  const handleCreateItem = (parentPath: string) => {
    setNewItemParentPath(parentPath);
    setIsCreateDialogOpen(true);
  };

  const onResize = useCallback(
    (event: any, { size }: { size: { width: number } }) => {
      setWidth(size.width);
    },
    []
  );

  const confirmCreateItem = () => {
    if (newItemName) {
      const newPath = newItemParentPath
        ? `${newItemParentPath}/${newItemName}`
        : newItemName;
      onFileCreate(newPath);
      setNewItemName("");
      setNewItemParentPath("");
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteItem = (itemPath: string) => {
    setItemToDelete(itemPath);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onFileDelete(itemToDelete);
      setItemToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  return (
    // <div className='flex flex-col h-full w-full'>
    <ResizableBox
      width={width}
      height={Number.POSITIVE_INFINITY}
      minConstraints={[200, Number.POSITIVE_INFINITY]}
      maxConstraints={[600, Number.POSITIVE_INFINITY]}
      onResize={onResize}
      resizeHandles={["e"]}
      className='flex flex-col h-full bg-background border-r'
    >
      <div className='p-4 flex justify-between items-center'>
        <h2 className='font-semibold'>{projectName}</h2>
        <ThemeToggle />
      </div>
      <div className='px-4 mb-2'>
        <Button onClick={() => handleCreateItem("")} className='w-full'>
          <Plus className='mr-2 h-4 w-4' /> New Item
        </Button>
      </div>
      <ScrollArea className='flex-1'>
        {fileSystem.map((item) => (
          <FileSystemItem
            key={item.path}
            item={item}
            depth={0}
            selectedFile={selectedFile}
            expandedFolders={expandedFolders}
            onFileSelect={onFileSelect}
            onFolderToggle={toggleFolder}
            onCreateItem={handleCreateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ScrollArea>
      <DeleteFileDialog
        fileToDelete={itemToDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={confirmDelete}
      />

      <CreateFileDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        newFileName={newItemName}
        setNewFileName={setNewItemName}
        confirmCreateFile={confirmCreateItem}
      />
      {/* </div> */}
    </ResizableBox>
  );
};

export default FileList;
