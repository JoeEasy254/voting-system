"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Vote } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  ID: z.string().min(2, {
    message: "voter ID must be at least 4 characters.",
  }),
  voterName: z.string().min(2, {
    message: "voter Name must be at least 6 characters.",
  }),
  voterPassword: z.string().min(2, {
    message: "voter Password must be at least 6 characters.",
  }),
});

export default function VoterLogin() {
  const registerVoter = useMutation(api.votes.registerVoter);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      voterName: "",
      voterPassword: "",
      ID: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const info = await registerVoter({
        Id: data.ID,
        voterName: data.voterName,
        voterPassword: data.voterPassword,
      });

      if (!info.success) {
        toast({
          title: "message",
          description: info?.message,
        });
        form.reset();
        return;
      }
      // set the user to the localStorage
      localStorage.setItem("user", JSON.stringify({ user: info.data }));
      router.push("/vote");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex h-screen md:items-center md:justify-center flex-col">
        <Form {...form}>
          <h1 className="font-large text-3xl md:m-4 m-2">
            <Vote className="w-20 h-20 animate-bounce" />
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-2/3 space-y-6 mx-2"
          >
            <FormField
              control={form.control}
              name="ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>voter ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID" {...field} />
                  </FormControl>
                  <FormDescription>Holds The voter ID</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="voterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>voter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="voter name" {...field} />
                  </FormControl>
                  <FormDescription>Holds The voter Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="voterPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>voter Password</FormLabel>
                  <FormControl>
                    <Input placeholder="voter Password" {...field} />
                  </FormControl>
                  <FormDescription>Holds the voter Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
