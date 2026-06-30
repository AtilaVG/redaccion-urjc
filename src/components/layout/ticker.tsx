"use client";

import { Zap } from "lucide-react";
import { getLatest } from "@/lib/news";

export function Ticker() {
  const items = getLatest().map((a) => a.title);
  const row = [...items, ...items];

  return (
    <div className="border-border/60 bg-card/40 relative z-20 flex items-center gap-4 border-y py-3 backdrop-blur-md">
      <div className="text-crimson flex shrink-0 items-center gap-2 pl-4 text-xs font-semibold tracking-widest uppercase">
        <Zap className="fill-crimson size-3.5" />
        Última hora
      </div>
      <div className="mask-fade-b relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-10 pr-10 whitespace-nowrap">
          {row.map((t, i) => (
            <span
              key={i}
              className="text-muted-foreground flex items-center gap-10 text-sm"
            >
              {t}
              <span className="text-violet">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
