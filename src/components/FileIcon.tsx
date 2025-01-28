import { FileText, FileImage, File } from "lucide-react";

interface FileIconProps {
  fileName: string;
}
const FileIcon = ({ fileName }: FileIconProps) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "java":
    case "ts":
    case "jsx":
    case "tsx":
      return <FileText className='mr-2 h-4 w-4 text-yellow-500' />;
    case "cpp":
    case "c":
      return <FileText className='mr-2 h-4 w-4 text-blue-500' />;
    case "md":
      return <FileText className='mr-2 h-4 w-4 text-green-500' />;
    case "jpg":
    case "png":
    case "gif":
    case "svg":
      return <FileImage className='mr-2 h-4 w-4 text-purple-500' />;
    default:
      return <File className='mr-2 h-4 w-4' />;
  }
};

export default FileIcon;
