import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from
'@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsRegistering(true);

    // In a real app, this would make an API call to register the user
    // For our MVP, we'll just simulate registration
    setTimeout(() => {
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created. Please log in to continue.'
      });

      navigate('/login');
      setIsRegistering(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="iaxxf6ik9" data-path="src/pages/RegisterPage.tsx">
      <NavBar />

      <main className="flex-1 flex items-center justify-center p-6" data-id="6uqrmt1h3" data-path="src/pages/RegisterPage.tsx">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Register to submit and track complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-id="anczrifq1" data-path="src/pages/RegisterPage.tsx">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) =>
                  <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  } />

                
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

                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) =>
                  <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  } />


                <FormDescription className="text-xs text-center">
                  By registering, you agree to our terms of service and privacy policy.
                </FormDescription>

                <Button type="submit" className="w-full" disabled={isRegistering}>
                  {isRegistering ? 'Creating Account...' : 'Register'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-gray-500 text-center w-full" data-id="dj2dza0fn" data-path="src/pages/RegisterPage.tsx">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>);

};

export default RegisterPage;