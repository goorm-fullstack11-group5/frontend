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
import { publicInstance } from "@/api/api";
import Navbar from "@/components/NavBar";

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function LoginPage({ setIsAuthenticated }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await publicInstance.post("/api/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      if (token) {
        window.localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to login. Please check your credentials and try again.");
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <Navbar isAuthenticated={false} />
      <div className='flex flex-grow items-center justify-center bg-background'>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>
              WEB IDE를 이용하시려면 로그인이 필요합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='username'>Username</Label>
                  <Input
                    id='username'
                    placeholder='유저네임을 입력해주세요'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='패스워드를 입력해주세요'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button className='w-full' onClick={handleSubmit}>
              로그인
            </Button>
            <div className='mt-4 text-sm text-center'>
              계정이 없으신가요?{" "}
              <a href='/signup' className='text-primary hover:underline'>
                회원가입
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
    </div>
  );
}
