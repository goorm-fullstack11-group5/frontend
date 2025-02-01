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

interface DeleteFileDialogProps {
  fileToDelete: string | null;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  confirmDelete: () => void;
  isFolder: boolean;
}

const DeleteItemDialog = ({
  fileToDelete,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete,
  isFolder,
}: DeleteFileDialogProps) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFolder ? "폴더 삭제 확인" : "파일 삭제 확인"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {fileToDelete} {isFolder ? "폴더" : "파일"}을 정말 삭제하시겠습니까?
            이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemDialog;
