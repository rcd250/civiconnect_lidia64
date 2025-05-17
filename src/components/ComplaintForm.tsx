import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MOCK_CATEGORIES } from '@/lib/data';
import { useComplaints } from '@/context/complaint-context';
import { useAuth } from '@/context/auth-context';

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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.'
  }).max(100),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.'
  }).max(1000),
  categoryId: z.string().min(1, {
    message: 'Please select a category.'
  }),
  location: z.string().min(5, {
    message: 'Location must be at least 5 characters.'
  }).max(200)
});

const ComplaintForm = () => {
  const { createComplaint } = useComplaints();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: '',
      location: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const newComplaint = createComplaint({
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,
        userId: user.id,
        location: {
          address: values.location
        }
      });

      // Navigate to the newly created complaint
      navigate(`/complaint/${newComplaint.id}`);
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a Complaint</CardTitle>
        <CardDescription>
          Provide details about your issue or feedback to help us address it efficiently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-id="wjqkv43zv" data-path="src/components/ComplaintForm.tsx">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief title of your complaint" {...field} />
                  </FormControl>
                  <FormDescription>
                    Summarize your complaint in a few words.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              } />

            
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>

                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_CATEGORIES.map((category) =>
                    <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                    )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best fits your complaint.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              } />

            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                    placeholder="Provide detailed information about your complaint"
                    className="min-h-32"
                    {...field} />

                  </FormControl>
                  <FormDescription>
                    Include as much detail as possible to help us understand and address your issue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              } />

            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Address or location of the issue" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide the address or a description of where the issue is located.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              } />


            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>);

};

export default ComplaintForm;