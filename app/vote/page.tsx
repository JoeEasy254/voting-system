"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Vote() {
  const getCandidates = useQuery(api.candidates.getCandidates);
  const castVote = useMutation(api.votes.castVote);
  const [voter, setVoter] = useState("");
  const [votes, setVotes] = useState<Record<string, string>>({});
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const activeVoter = JSON.parse(localStorage.getItem("user") || "{}");
    if (!activeVoter.user) {
      router.push("/vote/login");
    }
    setVoter(activeVoter.user);
  }, [router]);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    //
    type Votes = {
      president: string;
      secretary: string;
      vicePresident: string;
    };

    // In a real application, you would send the votes to a backend
    await castVote({ user: voter, votes: votes as Votes, hasVoted: true });
    toast({
      title: "Vote Submitted",
      description: "Your votes have been recorded successfully.",
    });
    // Clear votes and mark user as voted
    router.push("/thank-you");
    localStorage.removeItem("user");
  };

  const positions = Array.from(
    new Set(getCandidates?.map((c) => camelize(c.values.candidatePosition)))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Cast Your Vote</h1>
      <form onSubmit={handleVote}>
        {positions.map((position: any, index) => (
          <Card key={index} className="mb-6">
            <CardHeader>
              <CardTitle>{position}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value) =>
                  setVotes({ ...votes, [position]: value })
                }
                value={positions[position]}
              >
                {getCandidates
                  ?.filter(
                    (candidate: any) =>
                      camelize(candidate.values.candidatePosition) === position
                  )
                  .map((candidate: any) => (
                    <div
                      key={candidate._id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={candidate.values.candidateName}
                        id={candidate.values.candidatePosition}
                      />
                      <Label htmlFor={candidate._id}>
                        {candidate.values.candidateName}
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
        <Button type="submit" className="w-full mt-4">
          Submit Votes
        </Button>
      </form>
    </div>
  );
}

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
