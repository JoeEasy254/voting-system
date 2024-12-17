"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

// Types
interface VoteEntry {
  user: string;
  votes: {
    [position: string]: string; // e.g., { president: "Jane Smith", secretary: "Will Smith" }
  };
}

interface CandidateVote {
  candidate: string;
  votes: number;
}

interface VoteGroup {
  position: string;
  votes: CandidateVote[];
}

export default function LiveCharts() {
  const [votes, setVotes] = useState<VoteGroup[]>([]);

  // Fetch votes
  const getVotes = useQuery(api.votes.getVotes);

  useEffect(() => {
    // Transform votes into chart-ready format
    function restructureVotesToArray(votesData: VoteEntry[] | undefined) {
      const result: VoteGroup[] = [];

      votesData?.forEach((voteEntry) => {
        //  collecting the votes
        const userVotes = voteEntry.votes;

        for (const position in userVotes) {
          const existingPosition = result.find(
            (item) => item.position === position
          );
          console.log("userVotes", userVotes);
          const voteData: CandidateVote = {
            candidate: userVotes[position],
            votes: 1, // Each vote entry contributes 1 vote
          };

          if (existingPosition) {
            const existingCandidate = existingPosition.votes.find(
              (item) => item.candidate === voteData.candidate
            );
            if (existingCandidate) {
              existingCandidate.votes += 1;
            } else {
              existingPosition.votes.push(voteData);
            }
          } else {
            result.push({
              position,
              votes: [voteData],
            });
          }
        }
      });

      setVotes(result);
    }

    restructureVotesToArray(getVotes as VoteEntry[]);
  }, [getVotes]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-[70%] flex flex-col md:grid grid-cols-2 gap-4 mt-2">
        {votes.map((voteGroup) => (
          <Card key={voteGroup.position}>
            <CardHeader>
              <CardTitle>{voteGroup.position}</CardTitle>
              <CardDescription>Live Voting Results</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={voteGroup.votes} layout="vertical">
                  <YAxis
                    dataKey="candidate"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                  />

                  <XAxis type="number" allowDecimals={false} />

                  <Tooltip />

                  <Bar dataKey="votes" fill="#82ca9d" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="h-screen flex md:items-center justify-center md:w-[30%] mt-4 w-full">
        <h1 className="text-center text-2xl font-bold">
          TOTAL LIVE VOTES:{" "}
          <Badge className="text-lg">
            {votes.reduce(
              (total, group) =>
                total +
                group.votes.reduce(
                  (sum, candidate) => sum + candidate.votes,
                  0
                ),
              0
            )}
          </Badge>
        </h1>
      </div>
    </div>
  );
}
