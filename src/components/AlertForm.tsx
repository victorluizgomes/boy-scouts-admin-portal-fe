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
  onPostSuccess: () => void;
}

const AlertForm: React.FC<AlertFormProps> = ({ onPostSuccess }) => {

  const apiKey = process.env.REACT_APP_API_KEY;

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
      description: '',
      expirationDate: new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // Convert the Date Object to Date and Time
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const dateString = values.expirationDate.toLocaleDateString('en-US', dateOptions);

    const formattedDate = `${dateString} EST`;
    console.log('Sending Date: ', formattedDate);

    // Format the data for the API
    const formattedData = {
        datetime: formattedDate,
        location: values.campLocation,
        description: values.description,
        type: values.type.charAt(0).toUpperCase() + values.type.slice(1),
    };

    // Make the POST request
    if (!apiKey) {
      console.error('API KEY Environment Variable not defined or set incorrectly');
      return;
    }
    try {
        await fetch("https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/alerts", {
            method: 'POST',
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success POST data:', data);
          onPostSuccess();
        })
        .catch(error => {
          console.error('Error:', error);
        });

    } catch (error) {
        console.error("Error posting alert:", error);
    }
}

  return (
    <div className='mb-8'>
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