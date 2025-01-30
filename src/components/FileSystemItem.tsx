import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Folder, FolderPlus, Plus, Trash2 } from "lucide-react";
import FileIcon from "./FileIcon";
import type { FileSystemItem as FileSystemItemType } from "@/types/FileSystem";

interface FileSystemItemProps {
  item: FileSystemItemType;
  depth: number;
  selectedFile: string;
  expandedFolders: Set<string>;
  onFileSelect: (filePath: string) => void;
  onFolderToggle: (folderPath: string) => void;
  onCreateItem: (parentPath: string) => void;
  onDeleteItem: (itemPath: string) => void;
}

const FileSystemItem = ({
  item,
  depth,
  selectedFile,
  expandedFolders,
  onFileSelect,
  onFolderToggle,
  onCreateItem,
  onDeleteItem,
}: FileSystemItemProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isExpanded = expandedFolders.has(item.path);

  return (
    <div style={{ paddingLeft: `${depth * 16}px` }}>
      <div
        className='relative'
        onMouseEnter={() => setHoveredItem(item.path)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Button
          variant='ghost'
          className={cn(
            "w-full justify-start text-left font-normal",
            selectedFile === item.path && "bg-accent text-accent-foreground",
            "hover:bg-accent hover:text-accent-foreground transition-colors"
          )}
          onClick={() =>
            item.type === "file"
              ? onFileSelect(item.path)
              : onFolderToggle(item.path)
          }
        >
          {item.type === "folder" && (
            <ChevronRight
              className={cn(
                "mr-2 h-4 w-4 transition-transform",
                isExpanded && "transform rotate-90"
              )}
            />
          )}
          {item.type === "folder" ? (
            <Folder className='mr-2 h-4 w-4' />
          ) : (
            <FileIcon fileName={item.name} />
          )}
          {item.name}
        </Button>
        {hoveredItem === item.path && (
          <div className='flex gap-2'>
            {item.type === "folder" && (
              <Button
                variant='ghost'
                size='icon'
                className='absolute right-14 top-1/2 transform -translate-y-1/2'
              >
                <FolderPlus className='h-4 w-4' />
              </Button>
            )}

            <Button
              variant='ghost'
              size='icon'
              className='absolute right-8 top-1/2 transform -translate-y-1/2'
              onClick={(e) => {
                e.stopPropagation();
                onCreateItem(item.path);
              }}
            >
              <Plus className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-2 top-1/2 transform -translate-y-1/2'
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item.path);
              }}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
      {item.type === "folder" &&
        isExpanded &&
        item.children.map((child) => (
          <FileSystemItem
            key={child.path}
            item={child}
            depth={depth + 1}
            selectedFile={selectedFile}
            expandedFolders={expandedFolders}
            onFileSelect={onFileSelect}
            onFolderToggle={onFolderToggle}
            onCreateItem={onCreateItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
    </div>
  );
};

export default FileSystemItem;
