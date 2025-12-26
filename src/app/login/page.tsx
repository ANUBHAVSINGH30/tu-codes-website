"use client"
import React from 'react'
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, Lock, OctagonAlert } from "lucide-react";
import { createSupabaseBrowser } from "../../../lib/supabase/client";
// import { GoogleButton } from '../../components/ui/google-signup-button';

function LoginPage() {
  const supabase =  createSupabaseBrowser();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Signed up! Check email if confirmation is enabled.");
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert("Signed up successfully") // or router.push("/")
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">

      <div className="w-full max-w-5xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:block md:basis-1/2 bg-blue-50 relative" aria-hidden={true}>
          <h1 className='shiny-gradient-text font-bold text-6xl footer-font absolute inset-0 z-20 m-auto size-50'>TU<br></br>CODEs</h1>
          
        </div>


        
        <div className="basis-full md:basis-1/2 p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Account</p>
          </div>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-border bg-background checked:bg-primary checked:border-primary transition-colors"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-foreground font-medium hover:underline transition-colors">
                Forgot Password?
              </a>
            </div>

            <Button type="button" onClick={handleSignUp} variant="outline" className="shadow-md w-full">
              Sign Up
            </Button>
            <Button type="button" onClick={handleSignIn} variant="outline" className="shadow-md w-full">
              Sign In 
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="bg-card rounded-xl">
              <OctagonAlert/>
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
