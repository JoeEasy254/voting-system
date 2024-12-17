import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getVotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("votes").collect();
  },
});

export const castVote = mutation({
  args: {
    user: v.string(),
    votes: v.object({
      president: v.string(), secretary: v.string(), "vicePresident": v.string()
    }),
    hasVoted: v.boolean()
  },
  handler: async (ctx, args) => {
    // check if votes exists
    const votes = await ctx.db.query("votes").collect()
    const isVoterExisting = votes.some(vote => vote.user == args.user)
    if (isVoterExisting) {
      throw new Error("you have already voted!")
    }
    await ctx.db.insert("votes", {
      user: args.user,
      votes: args.votes,
      hasVoted: args.hasVoted
    })
  }
})

export const registerVoter = mutation({
  args: {
    Id: v.string(),
    voterName: v.string(),
    voterPassword: v.string()
  },
  handler: async (ctx, args) => {

    const voters = await ctx.db.query("voter").collect()
    const isVoterExisting = voters.some(voter => voter.Id == args.Id && voter.hasVoted == true)

    if (isVoterExisting) {
      return {
        success: false,
        message: "you have already voted"
      }
    }

    const voter = await ctx.db.insert("voter", {
      Id: args.Id,
      voterName: args.voterName,
      voterPassword: args.voterPassword,
      hasVoted: false
    });

    return {
      success: true,
      data: voter
    }
  },
})