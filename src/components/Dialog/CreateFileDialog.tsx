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
}

const CreateFileDialog = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newFileName,
  setNewFileName,
  confirmCreateFile,
}: CreateFileDialogProps) => {
  return (
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
  );
};

export default CreateFileDialog;
