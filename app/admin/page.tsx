import React from "react";
import CandidateForm from "./_components/Canditates";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function page() {
  return (
    <>
      <div className="flex justify-end mx-2">
        <Button variant={"destructive"}>
          end elections
          <X />
        </Button>
      </div>

      <CandidateForm />
    </>
  );
}
