import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type NameTooltipType = "identity" | "currency";

interface NameTooltipProps {
  iAddress: string;
  type: NameTooltipType;
  children: React.ReactNode;
  delay?: number; // Hover delay in ms, default 600
}

export function NameTooltip({
  iAddress,
  type,
  children,
  delay = 600,
}: NameTooltipProps) {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);

  // 👇 Add generic: useQuery<string>
  const { data, isLoading, isError } = useQuery<string>({
    queryKey: [type, "friendlyname", iAddress],
    enabled: !!iAddress && triggerFetch,
    queryFn: async () => {
      const endpoint =
        type === "identity" ? "/api/getidentity" : "/api/getcurrency";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: iAddress }),
      });
      const r = await res.json();
      if (!r.result)
        throw new Error("Not found");
      if (type === "identity") {
        return r.result.friendlyname;
      } else {
        return r.result.fullyqualifiedname;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 min
    // REMOVE THIS LINE:
    // cacheTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });  

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (val) {
      timeout.current = setTimeout(() => setTriggerFetch(true), delay);
    } else {
      setTriggerFetch(false);
      if (timeout.current) clearTimeout(timeout.current);
    }
  }

  return (
    <Tooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent sideOffset={6}>
        {!triggerFetch
          ? null
          : isLoading
          ? "Loading…"
          : isError
          ? "No name found"
          : data}
      </TooltipContent>
    </Tooltip>
  );
}
