import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/TextArea";
import { Input } from "./ui/Input";

interface CampDescriptionFormProps {
  onPostSuccess: () => void;
}

const CampDescriptionForm: React.FC<CampDescriptionFormProps> = ({
  onPostSuccess,
}) => {
  const formSchema = z.object({
    campLocation: z.string(),
    description: z.string(),
    campAddress: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campLocation: "bert-adams",
      description: "",
      campAddress: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Format the data for the API
    const formattedData = {
      location: values.campLocation,
      description: values.description,
      address: values.campAddress,
    };

    // Make the POST request
    try {
      await fetch(
        "https://jah5bhajkh.execute-api.us-east-1.amazonaws.com/DEV/descriptions",
        {
          method: "POST",
          headers: {
            "x-api-key": "efmr7ASvRi1VX7tFhp4tPaJn6sK9jLqe4CpgEDmm",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success POST data:", data);
          onPostSuccess();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error posting alert:", error);
    }
  }

  return (
    <div className="mb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="campLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Camp Location for the Description</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Camp Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bert-adams">
                      Bert Adams Scout Camp
                    </SelectItem>
                    <SelectItem value="allatoona">
                      Allatoona Aquatics Base
                    </SelectItem>
                    <SelectItem value="woodruff">
                      Woodruff Scout Camp
                    </SelectItem>
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
                  This is the main text that will display as the camp
                  description.
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
