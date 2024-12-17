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
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const FormSchema = z.object({
  candidateName: z.string().min(2, {
    message: "Candidate Name must be at least 6 characters.",
  }),
  candidatePosition: z.string().min(2, {
    message: "candidate position must be at least 6 characters.",
  }),
  candidateBio: z.string().min(2, {
    message: "candidate's bio",
  }),
});

export default function CandidateForm() {
  const registerCandidate = useMutation(api.candidates.insertCandidate);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      candidateName: "",
      candidatePosition: "",
      candidateBio: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const info = await registerCandidate({ values: data });
      toast({
        title: "message",
        description: info?.message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex h-screen md:items-center md:justify-center  flex-col ">
        <Form {...form}>
          <h1 className="font-large text-3xl md:m-4 m-2">
            Register Candidates
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-2/3 space-y-6 mx-2"
          >
            <FormField
              control={form.control}
              name="candidateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
                  <FormControl>
                    <Input placeholder="candidate name" {...field} />
                  </FormControl>
                  <FormDescription>Holds The candidate Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidatePosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Position</FormLabel>
                  <FormControl>
                    <Input placeholder="candidate position" {...field} />
                  </FormControl>
                  <FormDescription>
                    Holds the candidate position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidateBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Position</FormLabel>
                  <FormControl>
                    <Textarea placeholder="candidate bio" {...field} />
                  </FormControl>
                  <FormDescription>Holds the candidate bio</FormDescription>
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
