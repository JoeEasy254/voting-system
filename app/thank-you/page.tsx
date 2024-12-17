import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">Thank You for Voting!</h1>
      <p className="text-xl text-center mb-8">Your vote has been recorded successfully.</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}

