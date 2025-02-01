import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import FileIcon from "./FileIcon";
import type { FileSystem } from "@/types/FileSystem";
import { useFileStore } from "@/hooks/useFileStore";

interface FileItemProps {
  item: FileSystem;
  onDeleteItem: (isFolder: boolean) => void;
  onRenameItem: (isFolder: boolean, currentName: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({
  item,
  onDeleteItem,
  onRenameItem,
}) => {
  // const fullPath = path ? `${path}/${item.name}` : item.name;
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedFileId, setSelectedFileName } = useFileStore();

  return (
    <div
      className='group flex items-center px-2 py-1'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setSelectedFileId(item.id.toString());
      }}
    >
      <Button
        variant='ghost'
        className={cn(
          "flex-1 justify-start text-left font-normal",
          "hover:bg-accent hover:text-accent-foreground transition-colors"
        )}
      >
        <FileIcon fileName={item.name} />
        <span className='ml-2'>{item.name}</span>
      </Button>
      {isHovered && (
        <>
          <Button
            variant='ghost'
            size='sm'
            className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFileId(item.id.toString());
              setSelectedFileName(item.name);
              onRenameItem(false, item.name);
            }}
          >
            <Pencil className='h-2 w-2' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFileId(item.id.toString());
              setSelectedFileName(item.name);
              onDeleteItem(false);
            }}
          >
            <Trash2 className='h-2 w-2' />
          </Button>
        </>
      )}
    </div>
  );
};

export default FileItem;
