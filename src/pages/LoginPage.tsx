import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import { MOCK_USERS } from '@/lib/data';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from
'@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  password: z.string().min(1, {
    message: 'Password is required.'
  })
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoggingIn(true);

    try {
      const success = login(values.email, values.password);

      if (success) {
        toast({
          title: 'Login Successful',
          description: 'Welcome back to CiviConnect!'
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="cvt1zbqfx" data-path="src/pages/LoginPage.tsx">
      <NavBar />

      <main className="flex-1 flex items-center justify-center p-6" data-id="m412mm48g" data-path="src/pages/LoginPage.tsx">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-id="xqo2qxkrs" data-path="src/pages/LoginPage.tsx">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) =>
                  <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  } />

                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) =>
                  <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  } />


                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm" data-id="sui3k4c7h" data-path="src/pages/LoginPage.tsx">
              <p className="text-gray-500 mb-4" data-id="rdqmnq6r7" data-path="src/pages/LoginPage.tsx">
                For demo purposes, you can use one of these accounts:
              </p>
              <div className="grid gap-2 text-xs text-gray-600" data-id="cjsyolgxx" data-path="src/pages/LoginPage.tsx">
                {MOCK_USERS.map((user) =>
                <div key={user.id} className="p-2 border rounded bg-gray-50" data-id="zzqhoxdin" data-path="src/pages/LoginPage.tsx">
                    <p data-id="78tdk47po" data-path="src/pages/LoginPage.tsx"><strong data-id="37kli7n9k" data-path="src/pages/LoginPage.tsx">Email:</strong> {user.email}</p>
                    <p data-id="lzf6l6ajp" data-path="src/pages/LoginPage.tsx"><strong data-id="cng53uqd1" data-path="src/pages/LoginPage.tsx">Role:</strong> {user.role}</p>
                    <p className="text-gray-400" data-id="3na02bruc" data-path="src/pages/LoginPage.tsx">(Use any password)</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-gray-500 text-center w-full" data-id="2mqc4wu2y" data-path="src/pages/LoginPage.tsx">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>);

};

export default LoginPage;