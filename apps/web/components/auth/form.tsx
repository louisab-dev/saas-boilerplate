"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { AppleIcon, GoogleIcon, MetaIcon } from "@/components/auth/icons";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignUpFormData = z.infer<typeof signupSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function AuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { signInWithEmail } = useAuth();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const {
    register: forgotRegister,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    await signInWithEmail(data.email, data.password);
  };

  const onSignupSubmit = (data: SignUpFormData) => {
    console.log("Signup data:", data);
    alert("Not implemented yet!");
  };

  const onForgotSubmit = (data: ForgotPasswordData) => {
    console.log("Forgot password data:", data);
    alert("Not implemented yet!");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {isForgotPassword
            ? (
              <form
                onSubmit={handleForgotSubmit(onForgotSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-balance text-muted-foreground">
                      Enter your email to reset your password
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...forgotRegister("email")}
                    />
                    {forgotErrors.email && (
                      <p className="text-sm text-red-500">
                        {forgotErrors.email.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setIsLogin(true);
                    }}
                    className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            )
            : isLogin
            ? (
              <form
                onSubmit={handleLoginSubmit(onLoginSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your account
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...loginRegister("email")}
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-red-500">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...loginRegister("password")}
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full">
                      <AppleIcon />
                      <span className="sr-only">Login with Apple</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <GoogleIcon />
                      <span className="sr-only">Login with Google</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MetaIcon />
                      <span className="sr-only">Login with Meta</span>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 text-center text-sm">
                    <div className="text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )
            : (
              <form
                onSubmit={handleSignupSubmit(onSignupSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-balance text-muted-foreground">
                      Sign up for your account
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      {...signupRegister("name")}
                    />
                    {signupErrors.name && (
                      <p className="text-sm text-red-500">
                        {signupErrors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...signupRegister("email")}
                    />
                    {signupErrors.email && (
                      <p className="text-sm text-red-500">
                        {signupErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...signupRegister("password")}
                    />
                    {signupErrors.password && (
                      <p className="text-sm text-red-500">
                        {signupErrors.password.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full">
                      <AppleIcon />
                      <span className="sr-only">Sign up with Apple</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <GoogleIcon />
                      <span className="sr-only">Sign up with Google</span>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MetaIcon />
                      <span className="sr-only">Sign up with Meta</span>
                    </Button>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            )}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        {" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
