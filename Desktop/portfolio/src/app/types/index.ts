import { type LucideIcon } from 'lucide-react'

export interface SocialIconProps {
  Icon: LucideIcon;
  href: string;
}

export interface WorkHistoryItemProps {
  company: string;
  position: string;
  duration: string;
}

export interface BlogPostLinkProps {
  title: string;
  url: string;
  description: string;
}

export interface SectionProps {
  isLoaded: boolean;
}

