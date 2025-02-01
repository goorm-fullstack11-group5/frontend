import { ArrowLeft, Menu } from "lucide-react";
// import LanguageSelector from "./LanguageSelector";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { authInstance } from "@/api/api";

interface TopBarProps {
  onToggleFileList: () => void;
  showFileList: boolean;
}

const TopBar = ({ onToggleFileList, showFileList }: TopBarProps) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const getToken = async () => {
    try {
      const response = await authInstance.post("/api/auth/login", {
        username: "foo",
        password: "foo",
      });

      const token = response.data.token;

      window.localStorage.setItem("token", token);

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
      <Button onClick={getToken}>Get Token</Button>
    </div>
  );
};

export default TopBar;
