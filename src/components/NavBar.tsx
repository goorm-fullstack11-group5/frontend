import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onLogout?: () => void;
  isAuthenticated: boolean;
}

const Navbar = ({ onLogout, isAuthenticated }: NavbarProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "w-full h-12 flex items-center justify-between px-4",
        theme === "dark" ? "bg-white text-black" : "bg-black text-white"
      )}
    >
      <div className='flex-grow'>
        <Link to='/' className='text-2xl font-bold'>
          WEB IDE
        </Link>
      </div>
      <div>
        {isAuthenticated && onLogout && (
          <Button onClick={onLogout}>Logout</Button>
        )}
      </div>
      <div
        className={cn(
          "flex items-center space-x-4",
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        )}
      >
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
