import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFileStore } from "@/hooks/useFileStore";

interface RenameItemDialogProps {
  isOpen: boolean;
  setIsRenameDialogOpen: (open: boolean) => void;
  onConfirm: () => void;
  setItemToRename: (name: string) => void;
  currentName: string;
  isFolder: boolean;
}

const RenameItemDialog: React.FC<RenameItemDialogProps> = ({
  isOpen,
  setIsRenameDialogOpen,
  onConfirm,
  setItemToRename,
  currentName,
  isFolder,
}) => {
  // const [newName, setNewName] = useState(currentName);
  const { selectedFileName } = useFileStore();

  return (
    <Dialog open={isOpen} onOpenChange={setIsRenameDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isFolder ? "폴더 이름 변경" : "파일 이름 변경"}
          </DialogTitle>
          <DialogDescription>
            {isFolder
              ? "수정할 폴더 이름을 입력하세요."
              : "수정할 파일 이름을 입력하세요."}
          </DialogDescription>
        </DialogHeader>
        <Input
          value={currentName}
          onChange={(e) => setItemToRename(e.target.value)}
          placeholder={selectedFileName || "수정할 이름을 입력하세요"}
        />
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setIsRenameDialogOpen(false)}
          >
            취소
          </Button>
          <Button onClick={onConfirm}>변경</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameItemDialog;
