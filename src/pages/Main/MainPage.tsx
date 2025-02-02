import Navbar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authInstance } from "@/api/api";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Icon, TrashIcon } from "lucide-react";
import { Select } from "@/components/ui/select";

interface MainPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

export interface Project {
  id: number;
  name: string;
  detail: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}


const MainPage = ({ setIsAuthenticated }: MainPageProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectLanguage, setProjectLanguage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const handleNewProject = () => {
    setShowNewProjectForm(true);
  };
  const handleHomeClick = () => {
    setShowNewProjectForm(false);  // 새 프로젝트 폼 숨기기
    setIsSideMenuOpen(false);      // 사이드 메뉴 닫기
  };

  const handleRequestProjects = async () => {
    setError("");

    try {
      const response = await authInstance.get("/api/projects");

      setProjectList(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
      setError("Failed to load projects.");
    }
  };

  useEffect(() => {
    handleRequestProjects();
  }, [])

  const handleCreateProjects = async () => {
    setError("");

    try {
      const response = await authInstance.post("/api/projects", {
        name: projectName,
        detail: projectDetail,
        language: projectLanguage,
      });
      
      console.log(response);
      handleHomeClick();
      handleRequestProjects();
    } catch (error) {
      console.error(error);
      setError("Failed to load projects.");
    }
  };

  const handleDeleteProject = async (id: any) => {
    setError("");

    try {
      const response = await authInstance.delete(`/api/projects/${id}`, );
      
      console.log(response);
      handleRequestProjects();
    } catch (error) {
      console.error(error);
      setError("Failed to delete project.");
    }
  }

  const formatDateTime = (datetimeStr: string) => {
    const date = new Date(datetimeStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar onLogout={handleLogout} isAuthenticated={true} />
      <div className='flex flex-grow justify-center bg-background m-4'>
        {showNewProjectForm ? (
          <Dialog open={showNewProjectForm} onOpenChange={setShowNewProjectForm}>
            <DialogContent>
              <Card>
                <CardHeader className="mb-4 font-bold">
                  <CardTitle>프로젝트 생성</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col w-96 gap-4'>

                  <Label>프로젝트 이름</Label>
                  <Input
                    id='projectName'
                    placeholder='프로젝트 이름을 입력하세요'
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />

                  <Label>프로젝트 설명</Label>
                  <Input
                    id='projectDetail'
                    placeholder='프로젝트 설명을 입력하세요'
                    value={projectDetail}
                    onChange={(e) => setProjectDetail(e.target.value)}
                    required
                  />

                  <Label>프로젝트 언어</Label>
                  <Select className='select w-full'
                    options={[
                      {value:'',  label:"언어를 선택해주세요."},
                      {value:'javascript',  label:"JavaScript"},
                      {value:'python',  label:"Python"},
                      {value:'java',  label:"Java"},
                    ]}
                    onChange={(event) => {setProjectLanguage(event.target.value)}}
                  >
                  </Select>
                  <Button className='w-full' onClick={handleCreateProjects}>생성</Button>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
        ) : (
          <div className='max-w-3xl w-full '>
            {projectList.map((project: Project) => (
              <Card key={project.id} className='m-4'>
                <CardHeader>
                  <CardTitle>{project.name} {project.language && `| ${project.language}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p> {project.detail || "설명 없음"}</p>
                  <p> 생성 날짜 : {formatDateTime(project.createdAt) || "날짜 없음"}</p>
                  <p> 마지막 실행 날짜 : {formatDateTime(project.updatedAt) || "날짜 없음"}</p>
                  <div className="flex flex-row gap-3">
                    <Button onClick={() => navigate("/editor")}>Continue</Button>
                    <Button onClick={() => handleDeleteProject(project.id)} className="bg-red-500">
                      <TrashIcon></TrashIcon>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button className='w-full' onClick={() => setShowNewProjectForm(true)}>새 프로젝트 생성</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
