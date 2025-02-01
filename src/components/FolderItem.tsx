import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Folder,
  FolderPlus,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import type { FileSystem } from "@/types/FileSystem";
import FileItem from "./FileItem";
import { useFileStore } from "@/hooks/useFileStore";

interface FolderItemProps {
  item: FileSystem;
  onCreateItem: (isFolder: boolean) => void;
  onDeleteItem: (isFolder: boolean) => void;
  onRenameItem: (isFolder: boolean, currentName: string) => void;
  children?: React.ReactNode;
}

const FolderItem: React.FC<FolderItemProps> = ({
  item,
  onCreateItem,
  onDeleteItem,
  onRenameItem,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { setSelectedFileName, setSelectedFileId } = useFileStore();

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='select-none'>
      <div
        className='group flex items-center px-2 py-1'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button
          variant='ghost'
          className={cn(
            "flex-1 justify-start text-left font-normal",
            "hover:bg-accent hover:text-accent-foreground transition-colors"
          )}
          onClick={toggleExpand}
        >
          <ChevronRight
            className={cn(
              "mr-2 h-4 w-4 transition-transform",
              isExpanded && "transform rotate-90"
            )}
          />
          <Folder className='mr-2 h-4 w-4' />
          <span>{item.name}</span>
        </Button>
        {isHovered && (
          <div className='flex opacity-0 group-hover:opacity-100 transition-opacity'>
            <Button
              variant='ghost'
              size='sm'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFileId(item.id.toString());
                setSelectedFileName(item.name);
                onCreateItem(true);
              }}
              className='h-6 w-6'
            >
              <FolderPlus className='h-2 w-2' />
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFileId(item.id.toString());
                console.log(item.id.toString());
                setSelectedFileName(item.name);
                onCreateItem(false);
              }}
              className='h-6 w-6'
            >
              <Plus className='h-2 w-2' />
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFileId(item.id.toString());
                setSelectedFileName(item.name);
                onRenameItem(true, item.name);
              }}
            >
              <Pencil className='h-2 w-2' />
            </Button>

            <Button
              variant='ghost'
              size='sm'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFileId(item.id.toString());
                setSelectedFileName(item.name);
                onDeleteItem(true);
              }}
              className='h-6 w-6'
            >
              <Trash2 className='h-2 w-2' />
            </Button>
          </div>
        )}
      </div>
      {isExpanded && item.files && (
        <div className='ml-4'>
          {item.files.map((subItem) =>
            subItem.isFolder ? (
              <FolderItem
                key={subItem.id}
                item={subItem}
                onCreateItem={onCreateItem}
                onDeleteItem={onDeleteItem}
                onRenameItem={onRenameItem}
              />
            ) : (
              <FileItem
                key={subItem.id}
                item={subItem}
                onDeleteItem={onDeleteItem}
                onRenameItem={onRenameItem}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FolderItem;
