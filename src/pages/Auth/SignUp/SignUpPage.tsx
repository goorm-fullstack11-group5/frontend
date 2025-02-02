import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/NavBar";
import { publicInstance } from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await publicInstance.post("/api/auth/register", {
        username,
        password,
        email,
      });

      if (response.data && response.data.userId) {
        console.log("User registered successfully");
        setIsDialogOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar isAuthenticated={false} />
      <div className='flex flex-grow items-center justify-center bg-background'>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>회원가입</CardTitle>
            <CardDescription>계정 생성하기</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>유저네임</Label>
                  <Input
                    id='username'
                    placeholder='유저네임을 입력해주세요'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='email'>이메일</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='이메일을 입력해주세요'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password'>비밀번호</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='비밀번호를 입력해주세요'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='confirmPassword'>비밀번호 확인</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='비밀번호를 다시 입력해주세요'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button className='w-full' onClick={handleSubmit}>
              회원가입 하기
            </Button>
            <div className='mt-4 text-sm text-center'>
              계정이 이미 있으신가요?{" "}
              <a href='/login' className='text-primary hover:underline'>
                로그인
              </a>
            </div>
          </CardFooter>
          {error && (
            <Alert variant='destructive' className='mt-4'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </Card>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>회원가입 성공!</DialogTitle>
          <DialogDescription>
            회원가입이 성공적으로 완료되었습니다.
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
