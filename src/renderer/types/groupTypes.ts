import { Project } from './projectTypes';
import {
  AccountType,
  BitbucketInstallation,
  User,
  UserLevel,
} from './userTypes';

export type GroupType = 'Bitbucket' | 'Gitlab' | 'Github' | 'Regular';

export type GroupState = 'Deleting' | 'Active' | 'Disabled' | 'Created';

export type GroupMembershipLevel = 'Admin' | 'Read';

export type StripeSubscriptionType = {
  purchasedSeats?: number;
  portalUrl?: string;
  checkoutSession?: string;
};

export interface GroupMembership {
  groupId?: number;
  level?: GroupMembershipLevel;
  userId?: number;
  identifier?: string;
  accountType?: AccountType;
}

export interface GroupInvitation {
  id?: number;
  groupId?: number;
  invitationTimestamp?: number;
  email?: string;
  groupType?: GroupType;
  expired?: boolean;
}

export type GroupPreferenceKey = 'SyncUsers';

export interface GroupPreference {
  key?: GroupPreferenceKey;
  value?: string;
  valueBoolean?: boolean;
}

export interface Group {
  id?: number;
  name?: string;
  type?: GroupType;
  state?: GroupState;
  level?: UserLevel;
  disabled?: boolean;
  owner?: User;
  canAdmin?: boolean;
  members?: GroupMembership[];
  invitations?: GroupInvitation[];
  remainingAnalysisQuota?: number;
  allowedNumberOfProjects?: number;
  bitbucketInstallation?: BitbucketInstallation;
  githubInstallationIdentifier?: number;
  stripeSubscription?: StripeSubscriptionType;
  hasSubscription?: boolean;
  projects?: Project[];
  preferences?: GroupPreference[];
}
