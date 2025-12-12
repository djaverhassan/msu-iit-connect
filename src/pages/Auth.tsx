import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import campusLogo from '@/assets/campus-logo.png';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name must be less than 50 characters'),
  confirmPassword: z.string(),
  userType: z.enum(['student', 'faculty', 'student_council']),
  college: z.string().min(1, 'Please select your college'),
  studentId: z.string().optional(),
  employeeId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.userType === 'faculty' && !data.employeeId) {
    return false;
  }
  return true;
}, {
  message: "Employee ID is required for faculty",
  path: ["employeeId"],
}).refine((data) => {
  if ((data.userType === 'student' || data.userType === 'student_council') && !data.studentId) {
    return false;
  }
  return true;
}, {
  message: "Student ID is required",
  path: ["studentId"],
});

const colleges = [
  { value: 'college_of_engineering_and_technology', label: 'College of Engineering and Technology' },
  { value: 'college_of_science_and_mathematics', label: 'College of Science and Mathematics' },
  { value: 'college_of_computer_studies', label: 'College of Computer Studies' },
  { value: 'college_of_education', label: 'College of Education' },
  { value: 'college_of_arts_and_science', label: 'College of Arts and Science' },
  { value: 'college_of_business_administration_and_accountancy', label: 'College of Business Administration & Accountancy' },
  { value: 'college_of_nursing', label: 'College of Nursing' },
];

const userTypes = [
  { value: 'student', label: 'Student' },
  { value: 'faculty', label: 'Faculty (Professor)' },
  { value: 'student_council', label: 'Student Council Member' },
];

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    userType: 'student' as 'student' | 'faculty' | 'student_council',
    college: '',
    studentId: '',
    employeeId: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      loginSchema.parse(loginForm);
      
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Login failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Login failed',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      signupSchema.parse(signupForm);
      
      const { error } = await signUp(
        signupForm.email, 
        signupForm.password, 
        signupForm.displayName,
        signupForm.userType,
        signupForm.college,
        signupForm.userType === 'faculty' ? signupForm.employeeId : undefined,
        signupForm.userType !== 'faculty' ? signupForm.studentId : undefined
      );
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Signup failed',
            description: 'This email is already registered. Please login instead.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Signup failed',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Account created!',
          description: 'Your account is pending verification by an administrator.',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-primary/10">
      {/* Logo above card */}
      <div className="flex justify-center mb-6">
        <img 
          src={campusLogo} 
          alt="MSU-IIT Logo" 
          className="h-20 w-20 object-contain" 
        />
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            MSU-IIT CampusLink
          </CardTitle>
          <CardDescription className="text-base">
            Access your account to connect with campus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupForm.displayName}
                    onChange={(e) => setSignupForm({ ...signupForm, displayName: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-type">I am a...</Label>
                  <Select
                    value={signupForm.userType}
                    onValueChange={(value: 'student' | 'faculty' | 'student_council') => 
                      setSignupForm({ ...signupForm, userType: value })
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-college">College</Label>
                  <Select
                    value={signupForm.college}
                    onValueChange={(value) => setSignupForm({ ...signupForm, college: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college.value} value={college.value}>
                          {college.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {signupForm.userType === 'faculty' ? (
                  <div className="space-y-2">
                    <Label htmlFor="signup-employee-id">Employee ID</Label>
                    <Input
                      id="signup-employee-id"
                      type="text"
                      value={signupForm.employeeId}
                      onChange={(e) => setSignupForm({ ...signupForm, employeeId: e.target.value })}
                      required
                      disabled={isLoading}
                      placeholder="e.g., EMP-12345"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="signup-student-id">Student ID</Label>
                    <Input
                      id="signup-student-id"
                      type="text"
                      value={signupForm.studentId}
                      onChange={(e) => setSignupForm({ ...signupForm, studentId: e.target.value })}
                      required
                      disabled={isLoading}
                      placeholder="e.g., 2021-0001"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Your account will be verified by an administrator before you can access all features.
                </p>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}