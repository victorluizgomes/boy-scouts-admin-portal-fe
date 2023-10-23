import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select"
import { Button } from "./ui/Button"
import { Textarea } from './ui/TextArea';
import { Input } from './ui/Input';

interface CampDescriptionFormProps {
  // Add any props you might need here
}

const CampDescriptionForm: React.FC<CampDescriptionFormProps> = () => {
  const formSchema = z.object({
    campLocation: z.string(),
    description: z.string(),
    campAddress: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campLocation: "bert-adams",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // TODO: Actually submit the form
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="campLocation"
            render={({ field }) => (
              <FormItem>
              <FormLabel>Camp Location for the Description</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Camp Location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bert-adams">Bert Adams Scout Camp</SelectItem>
                  <SelectItem value="allatoona">Allatoona Aquatics Base</SelectItem>
                  <SelectItem value="woodruff">Woodruff Scout Camp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camp Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  This is the main text that will display as the camp description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camp Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit Camp Information</Button>
        </form>
      </Form>
    </div>
  );
};

export default CampDescriptionForm;