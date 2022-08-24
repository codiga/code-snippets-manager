// Badge type
export enum BadgeType {
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze',
  None = 'None',
}

// Badge category
export enum BadgeCategory {
  Recipes = 'Recipes',
  Comments = 'Comments',
  Usage = 'Usage',
}

export type BadgeEnumeration =
  | BadgeType.Gold
  | BadgeType.Silver
  | BadgeType.Bronze
  | BadgeType.None;

export interface AssistantUserBadges {
  publicRecipesCountBadge?: BadgeEnumeration;
  publicRecipesUsageBadge?: BadgeEnumeration;
  commentsBadge?: BadgeEnumeration;
  size?: number;
}
