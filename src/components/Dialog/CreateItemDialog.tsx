import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface CreateFileDialogProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  newFileName: string;
  setNewFileName: (name: string) => void;
  confirmCreateFile: () => void;
  isFolder: boolean;
}

const CreateItemDialog = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newFileName,
  setNewFileName,
  confirmCreateFile,
  isFolder,
}: CreateFileDialogProps) => {
  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isFolder ? "새 폴더 생성" : "새 파일 생성"}
          </DialogTitle>
          <DialogDescription>
            {isFolder
              ? "새로 생성할 폴더의 이름을 입력하세요."
              : "새로 생성할 파일의 이름을 입력하세요."}
          </DialogDescription>
        </DialogHeader>
        <Input
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder={isFolder ? "폴더 이름" : "파일 이름"}
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
  );
};

export default CreateItemDialog;
