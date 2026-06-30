import {
  FlaskConical,
  Lightbulb,
  Mic,
  GraduationCap,
  BookMarked,
  Megaphone,
  Palette,
  Building2,
  BookText,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  flask: FlaskConical,
  lightbulb: Lightbulb,
  podium: Mic,
  cap: GraduationCap,
  book: BookMarked,
  megaphone: Megaphone,
  palette: Palette,
  building: Building2,
};

export function CollectionIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const Icon = map[iconKey] ?? BookText;
  return <Icon className={className} />;
}

/** CSS variable name for an accent token. */
export const accentVar: Record<string, string> = {
  garnet: "--garnet",
  gold: "--gold",
  red: "--red",
  amber: "--amber",
};
