"use client";
import { Maximize, Minimize } from "lucide-react";
import { Hint } from "@/components/hint";
interface FullScreenProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

export const FullScreenControl = ({
  isFullScreen,
  onToggle,
}: FullScreenProps) => {
  const Icon = isFullScreen ? Maximize : Minimize;
  const label = isFullScreen ? "Exit Full Screen" : "Enter Full Screen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
