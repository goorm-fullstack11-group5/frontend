import { ArrowLeft } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  language: string;
  onSelect: (lang: string) => void;
}

const TopBar = ({ language, onSelect }: TopBarProps) => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  }

  return (
    <div className={`flex w-full h-12 px-4 justify-between items-center`}>
      <ArrowLeft
        className='cursor-pointer hover:text-gray-500 transition-colors duration-200'
        onClick={handleBackNavigation}
      />
      <span>Bar</span>
      <div className='p-2'>
        <LanguageSelector language={language} onSelect={onSelect} />
      </div>
    </div>
  );
}

export default TopBar
