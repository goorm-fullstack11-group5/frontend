import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <div>
      Main Page
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
}

export default MainPage
