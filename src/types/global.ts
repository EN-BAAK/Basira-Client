import { User } from "./models";

export type CommonParentProps = {
  readonly children: React.ReactNode
}

export type ID = string

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string,
  subtitle: string
}

export type CachedUser = { data: User; timestamp: number } | null

export interface SelectedItemState {
  id: ID;
  state: "old" | "new" | "remove";
}

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
}