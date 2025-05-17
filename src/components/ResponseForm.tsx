import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useComplaints } from '@/context/complaint-context';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage } from
'@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  message: z.string().min(5, {
    message: 'Message must be at least 5 characters.'
  }).max(1000)
});

interface ResponseFormProps {
  complaintId: string;
  onSuccess?: () => void;
}

const ResponseForm = ({ complaintId, onSuccess }: ResponseFormProps) => {
  const { addResponse } = useComplaints();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const success = addResponse(complaintId, values.message);

      if (success) {
        form.reset();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Error adding response:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border p-4 rounded-lg bg-gray-50" data-id="8vsedc205" data-path="src/components/ResponseForm.tsx">
      <h3 className="text-lg font-medium mb-4" data-id="fg417e6k5" data-path="src/components/ResponseForm.tsx">Add Response</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-id="fs5rbm9os" data-path="src/components/ResponseForm.tsx">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) =>
            <FormItem>
                <FormControl>
                  <Textarea
                  placeholder="Enter your response here..."
                  className="min-h-24 bg-white"
                  {...field} />

                </FormControl>
                <FormMessage />
              </FormItem>
            } />

          
          <div className="flex justify-end" data-id="t3mgwnbgo" data-path="src/components/ResponseForm.tsx">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Response'}
            </Button>
          </div>
        </form>
      </Form>
    </div>);

};

export default ResponseForm;