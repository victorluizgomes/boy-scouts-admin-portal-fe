import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../utils/Utils"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/Popover"
import { Calendar } from "./ui/Calendar"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"

interface AlertFormProps {
  // Add any props you might need here
}

const AlertForm: React.FC<AlertFormProps> = () => {

  const formSchema = z.object({
    type: z.string(),
    campLocation: z.string(),
    description: z.string(),
    expirationDate: z.date(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "information",
      campLocation: "bert-adams",
      description: "",
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
            name="type"
            render={({ field }) => (
              <FormItem>
              <FormLabel>Alert Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select An Alert Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="information">Information</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                  <SelectItem value="amber">Amber</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campLocation"
            render={({ field }) => (
              <FormItem>
              <FormLabel>Camp Location for the Alert</FormLabel>
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
                <FormLabel>Alert Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  This is the main text that will display with the alert.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Alert Expiration Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Date when the alert will expire.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit the Alert</Button>
        </form>
      </Form>
    </div>
  );
};

export default AlertForm;