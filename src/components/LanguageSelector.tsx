import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES } from "@/constants/languages";

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

const LanguageSelector = ({ language, onSelect }: LanguageSelectorProps) => {
  
  const DropdownMenuItems = Object.entries(LANGUAGES).map(([lang, version]) => (
    <DropdownMenuItem key={lang} onClick={() => onSelect(lang)}>
      {lang} : {version}
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{language}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel >Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {DropdownMenuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
