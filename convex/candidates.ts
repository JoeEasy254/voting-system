import { mutation, query } from './_generated/server'
import { v } from 'convex/values'


export const getCandidates = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("candidates").collect();
  },
});



export const insertCandidate = mutation({
    args: {
        values: v.object({
            candidateName: v.string(),
            candidatePosition: v.string(),
            candidateBio: v.string()
        })
    },
    handler: async (ctx, args) => {


        await ctx.db.insert("candidates", {
            values: args.values,
        });
        return {
            success: true,
            message: "candidate successfully registered"
        }
    },
})