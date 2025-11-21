import { FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="  mx-auto text-center text-[rgba(143,149,158,1)]">
        <FileText className="mx-auto mb-3" />
        No Product To Show
      </div>
    </div>
  );
}
