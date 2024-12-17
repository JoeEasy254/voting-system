import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Elect 2025</h1>
        <div className="flex justify-center space-x-4">
          <Link href="/vote/login">
            <Button>Voter Login</Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
