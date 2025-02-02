import Navbar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface MainPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const MainPage = ({ setIsAuthenticated }: MainPageProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar onLogout={handleLogout} isAuthenticated={true} />
      <h1>Main Page</h1>

      <div>
        <Button>
          <Link to='/login'>Login</Link>
        </Button>
        &nbsp;
        <Button>
          <Link to='/signup'>SignUp</Link>
        </Button>
        &nbsp;
        <Button>
          <Link to='/editor'>Editor</Link>
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
