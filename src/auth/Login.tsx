import React from 'react'
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
type Props = {}

const Login = (props: Props) => {
  return (
    <Card className="mx-auto max-w-md w-[26rem]">
    <CardHeader>
      <CardTitle className="text-3xl font-bold">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className='py-5'
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            className='py-5' id="password" type="password" required />
        </div>
        <Button type="submit" className="py-5 w-full">
          Login
        </Button>
        <Button variant="outline" className="py-5 w-full">
          Login with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/auth/signup" className="underline">
          Sign up
        </Link>
      </div>
    </CardContent>
  </Card>
  )
}

export default Login