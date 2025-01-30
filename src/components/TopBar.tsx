import { ArrowLeft, Menu } from "lucide-react";
// import LanguageSelector from "./LanguageSelector";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import instance, { authInstance, publicInstance } from "@/api/api";
import axios from "axios";

interface TopBarProps {
  language: string;
  onSelect: (lang: string) => void;
  onToggleFileList: () => void;
  showFileList: boolean;
}

const TopBar = ({
  language,
  onSelect,
  onToggleFileList,
  showFileList,
}: TopBarProps) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const test = async () => {
    try {
      // console.log(import.meta.env.VITE_API_URL);
      const response = await authInstance.get("/api/projects/1");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex w-full h-12 px-4 justify-between items-center`}>
      <ArrowLeft
        className='cursor-pointer hover:text-gray-500 transition-colors duration-200'
        onClick={handleBackNavigation}
      />
      <span>Bar</span>
      <div className='flex items-center space-x-2'>
        <Button
          variant='ghost'
          size='icon'
          className='lg:hidden'
          onClick={onToggleFileList}
          aria-label={showFileList ? "Close file list" : "Open file list"}
        >
          <Menu className='h-5 w-5' />
        </Button>
      </div>
      {/* <div className='p-2'> */}
      {/* <LanguageSelector language={language} onSelect={onSelect} /> */}

      {/* </div> */}

      <Button onClick={test}>Test</Button>
    </div>
  );
};

export default TopBar;
