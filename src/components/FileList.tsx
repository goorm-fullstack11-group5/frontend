import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "./ThemeToggle";
import { FilePlus, FolderPlus, Settings } from "lucide-react";
import type { FileSystem } from "@/types/FileSystem";
import "react-resizable/css/styles.css";

import DeleteItemDialog from "./Dialog/DeleteItemDialog";
import CreateItemDialog from "./Dialog/CreateItemDialog";
import { authInstance } from "@/api/api";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";
import { useFileStore } from "@/hooks/useFileStore";
import { CODE_SNIPPETS } from "@/constants/languages";
import { Separator } from "./ui/separator";
import RenameItemDialog from "./Dialog/RenameItemDialog";

interface FileListProps {
  fileSystem: FileSystem;
}

const FileList = ({ fileSystem }: FileListProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [isDeleteFolder, setIsDeleteFolder] = useState(false);
  const [isRenameFolder, setIsRenameFolder] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [itemToRename, setItemToRename] = useState<string>("");
  const {
    selectedFileId,
    selectedFileName,
    setSelectedFileId,
    setIsFileSystemUpdated,
  } = useFileStore();

  const handleCreateItem = (isFolder: boolean) => {
    if (isFolder) {
      setIsCreateFolder(true);
    } else setIsCreateFolder(false);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteItem = (isFolder: boolean) => {
    if (isFolder) {
      setIsDeleteFolder(true);
    } else setIsDeleteFolder(false);
    setIsDeleteDialogOpen(true);
  };

  const handleRenameItem = (isFolder: boolean, currentName: string) => {
    if (isFolder) {
      setIsRenameFolder(true);
      setItemToRename(currentName);
    } else setIsRenameFolder(false);
    console.log("current Name: " + currentName);
    setIsRenameDialogOpen(true);
  };

  const confirmRenameItem = async () => {
    console.log(itemToRename, isRenameFolder);
    if (itemToRename && isRenameFolder) {
      console.log("rename folder");
      try {
        const response = await authInstance.patch(
          `/api/projects/${fileSystem.id}/folders/${selectedFileId}`,
          { name: itemToRename }
        );
        console.log(response.data);
        setItemToRename("");
        setIsRenameDialogOpen(false);
        setIsFileSystemUpdated();
      } catch (error) {
        console.error("Error renaming item:", error);
      }
    } else if (itemToRename && !isRenameFolder) {
      try {
        console.log("rename file");
        const response = await authInstance.patch(
          `/api/projects/${fileSystem.id}/files/${selectedFileId}`,
          { name: itemToRename }
        );
        console.log(response.data);
        setItemToRename("");
        setIsRenameDialogOpen(false);
        setIsFileSystemUpdated();
      } catch (error) {
        console.error("Error renaming item:", error);
      }
    }
  };

  const confirmCreateItem = async () => {
    if (newItemName && isCreateFolder) {
      try {
        const response = await authInstance.post(
          `/api/projects/${fileSystem.id}/folders`,
          {
            name: newItemName,
            parentId: selectedFileId,
          }
        );
        console.log(response.data);
        setNewItemName("");
        setIsCreateDialogOpen(false);
        setIsFileSystemUpdated();
      } catch (error) {
        console.error(error);
      }
    } else if (newItemName && !isCreateFolder) {
      try {
        const fileExtension = newItemName.split(".").pop()?.toLowerCase() || "";
        const baseName = newItemName.replace(/\.[^/.]+$/, "");
        let template =
          CODE_SNIPPETS[fileExtension as keyof typeof CODE_SNIPPETS];

        if (
          fileExtension === "java" &&
          typeof CODE_SNIPPETS.java === "function"
        ) {
          template = CODE_SNIPPETS.java(baseName);
        }

        const response = await authInstance.post(
          `/api/projects/${fileSystem.id}/files`,
          {
            name: newItemName,
            content: template,
            parentFolderId: selectedFileId,
          }
        );
        console.log(response.data);
        setNewItemName("");
        setIsCreateDialogOpen(false);
        setIsFileSystemUpdated();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const confirmDelete = async () => {
    if (selectedFileName && isDeleteFolder) {
      try {
        const response = await authInstance.delete(
          `/api/projects/${fileSystem.id}/folders/${selectedFileId}`
        );
        console.log(response.data);
        setIsDeleteDialogOpen(false);
        setIsFileSystemUpdated();
      } catch (error) {
        console.error(error);
      }
    } else if (selectedFileName && !isDeleteFolder) {
      try {
        const response = await authInstance.delete(
          `/api/projects/${fileSystem.id}/files/${selectedFileId}`
        );
        console.log(response.data);
        setIsDeleteDialogOpen(false);
        setIsFileSystemUpdated();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderFileSystemItem = (item: FileSystem) => {
    if (item.isFolder) {
      return (
        <FolderItem
          key={item.id}
          item={item}
          onCreateItem={handleCreateItem}
          onDeleteItem={handleDeleteItem}
          onRenameItem={handleRenameItem}
        >
          {item.files && item.files.map(renderFileSystemItem)}
        </FolderItem>
      );
    } else {
      return (
        <FileItem
          key={item.id}
          item={item}
          onDeleteItem={handleDeleteItem}
          onRenameItem={handleRenameItem}
        />
      );
    }
  };

  return (
    <div className='flex flex-col h-full bg-background border-r'>
      <div className='p-2 text-center border-t border-b'>
        <h2 className='font-semibold text-lg'>{fileSystem.name}</h2>
      </div>
      <div className='px-4 p-2 border-b'>
        <div className='flex gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='flex-1'
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFileId(fileSystem.id.toString());
              handleCreateItem(true);
            }}
          >
            <FolderPlus className=' mr-2 h-4 w-4' />
          </Button>
          <Separator orientation='vertical' className='mr-4' />
          <Button
            variant='ghost'
            size='icon'
            className='flex-1'
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFileId(fileSystem.id.toString());
              handleCreateItem(false);
            }}
          >
            <FilePlus className='mr-2 h-4 w-4' />
          </Button>
        </div>
      </div>
      <ScrollArea className='flex-1'>
        {fileSystem.files && fileSystem.files.map(renderFileSystemItem)}
      </ScrollArea>
      <div className='p-4 flex justify-between items-center border-t'>
        <Button variant='ghost' size='icon'>
          <Settings className='h-[1.2rem] w-[1.2rem]' />
        </Button>
        <ThemeToggle />
      </div>
      <DeleteItemDialog
        fileToDelete={selectedFileName}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={confirmDelete}
        isFolder={isDeleteFolder}
      />

      <CreateItemDialog
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        newFileName={newItemName}
        setNewFileName={setNewItemName}
        confirmCreateFile={confirmCreateItem}
        isFolder={isCreateFolder}
      />
      <RenameItemDialog
        isOpen={isRenameDialogOpen}
        setIsRenameDialogOpen={setIsRenameDialogOpen}
        onConfirm={confirmRenameItem}
        setItemToRename={setItemToRename}
        currentName={itemToRename || ""}
        isFolder={isRenameFolder}
      />
    </div>
  );
};

export default FileList;
