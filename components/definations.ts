import { Icons } from "./icons";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
  onclick?: () => void;
}

export interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
}

export type Tab = {
  id: "text" | "document";
  label: string;
  icon: keyof typeof Icons;
};

export const TABS: Tab[] = [
  { id: "text", label: "Text", icon: "textAa" },
  { id: "document", label: "Document", icon: "upload" },
];

export const MAX_CHARACTERS = 25000;
