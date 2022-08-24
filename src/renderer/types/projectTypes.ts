import { LanguageEnumeration } from './assistantTypes';
import { Group } from './groupTypes';
import { User, UserLevel } from './userTypes';

export type ProjectState =
  | 'Active'
  | 'Deleting_In_Progress'
  | 'Deleting'
  | 'Disabled';

export type AnalysisResultStatus =
  | 'Unknown'
  | 'Done'
  | 'Error'
  | 'Same_Revision'
  | 'Ignore'
  | 'InProgress'
  | 'Scheduled'
  | 'Started';

export type ViolationCategory =
  | 'Unknown'
  | 'Error_Prone'
  | 'Code_Style'
  | 'Best_Practice'
  | 'Safety'
  | 'Security'
  | 'Design'
  | 'Deployment'
  | 'Documentation'
  | 'Performance';

export interface DuplicateOccurrence {
  filename?: string;
  line?: number;
}

export interface Duplicate {
  id?: number;
  lineCount?: number;
  code?: string;
  occurrences?: DuplicateOccurrence[];
}

export interface ComplexFunction {
  complexity?: number;
  filename?: string;
  functionName?: string;
  length?: number;
  lineStart?: number;
  lineEnd?: number;
  nbParameters?: number;
  language?: LanguageEnumeration;
}

export interface Violation {
  filename?: string;
  line?: number;
  description?: string;
  severity?: number;
  category?: ViolationCategory;
  lineCount?: number;
  language?: LanguageEnumeration;
  tool?: string;
  rule?: string;
  ruleUrl?: string;
  codeHash?: string;
  uniqueIdentifier?: string;
}

export type VersionConstraintEnumeration =
  | 'Unknown'
  | 'LessOrEqual'
  | 'LessThan'
  | 'GreaterOrEqual'
  | 'GreaterThan'
  | 'Equal';

export type ProjectStatus =
  | 'Unavailable'
  | 'Unknown'
  | 'Critical'
  | 'Warning'
  | 'Neutral'
  | 'Good'
  | 'Excellent';

export interface Dependency {
  name?: string;
  language?: LanguageEnumeration;
  version?: string;
  timestampAdded?: number;
  timestampUpdated?: number;
  homepage?: string;
  deprecated?: boolean;
  insecure?: boolean;
  tags?: string[];
}

export interface AnalysisDependency {
  name?: string;
  language?: LanguageEnumeration;
  versionConstraint?: VersionConstraintEnumeration;
  version?: string;
  newVersion?: number;
  versions?: Dependency[];
}

export interface CodeDensity {
  filename?: string;
  function?: string;
  metric?: number;
}

export interface TechnicalDebtType {
  score?: number;
  grade?: ProjectStatus;
  fixingViolationsHours?: number;
  fixingDuplicatesHours?: number;
  fixingComplexityHours?: number;
  fixingReadabilityHours?: number;
  fixingViolationsCost?: number;
  fixingDuplicatesCost?: number;
  fixingComplexityCost?: number;
  fixingReadabilityCost?: number;
  violationsDensity?: CodeDensity[];
  duplicatesDensity?: CodeDensity[];
  complexFunctions?: CodeDensity[];
  longFunctions?: CodeDensity[];
}

export interface AnalysisResultSummary {
  duplicated_lines?: number;
  duplicated_linesPerSloc?: number;
  duplicates?: number;
  duplicatesPerSloc?: number;
  violations?: number;
  violationsDocumentation?: number;
  violationsPerformance?: number;
  violationsDeployment?: number;
  violationsDesign?: number;
  violationsSecurity?: number;
  violationsSafety?: number;
  violationsBest_practice?: number;
  violationsCode_style?: number;
  violationsError_prone?: number;
  violationsUnknown?: number;
  violationsDocumentationPerSloc?: number;
  violationsPerformancePerSloc?: number;
  violationsDeploymentPerSloc?: number;
  violationsDesignPerSloc?: number;
  violationsSecurityPerSloc?: number;
  violationsSafetyPerSloc?: number;
  violationsBest_practicePerSloc?: number;
  violationsCode_stylePerSloc?: number;
  violationsError_pronePerSloc?: number;
  violationsUnknownPerSloc?: number;
  violationsSeverity1?: number;
  violationsSeverity2?: number;
  violationsSeverity3?: number;
  violationsSeverity4?: number;
  violationsSeverity1PerSloc?: number;
  violationsSeverity2PerSloc?: number;
  violationsSeverity3PerSloc?: number;
  violationsSeverity4PerSloc?: number;
  complexFunctionsRate?: number;
  longFunctionsRate?: number;
  longFunctions?: number;
  complexFunctions?: number;
  totalFunctions?: number;
}

export type AnalysisErrorType =
  | 'Unknown'
  | 'TooManyLines'
  | 'ShellError'
  | 'ScalaError'
  | 'SecurityError'
  | 'PythonError'
  | 'PhpError'
  | 'LizardError'
  | 'JavascriptError'
  | 'JavaError'
  | 'GoError'
  | 'DependsError'
  | 'DuplicationFindError'
  | 'CloneError'
  | 'CppError'
  | 'BanditError'
  | 'AuthenticationError';

export interface AnalysisResultStatType {
  language?: string;
  lines?: number;
}

export interface AnalysisNodeViolationsPerLanguage {
  language?: LanguageEnumeration;
  violations?: number;
}

export interface AnalysisNode {
  name?: string;
  isFile?: boolean;
  fullPath?: string;
  violations?: number;
  duplicates?: number;
  violationsPerLanguage?: AnalysisNodeViolationsPerLanguage[];
  complexFunctions?: number;
  longFunctions?: number;
  totalFunctions?: number;
}

export interface Analysis {
  id?: number;
  status?: AnalysisResultStatus;
  startTimestamp?: number;
  runningTimeSeconds?: number;
  revision?: string;
  repoUrl?: string;
  level?: UserLevel;
  repoUsername?: string;
  repoRevision?: string;
  repoBranch?: string;
  tooManySlocs?: boolean;
  violations?: Violation[];
  violationsCount?: number;
  duplicates?: Duplicate[];
  complexFunctions?: ComplexFunction[];
  complexFunctionsCount?: number;
  longFunctions?: ComplexFunction[];
  dependencies?: AnalysisDependency[];
  longFunctionsCount?: number;
  techdebt?: TechnicalDebtType;
  summary?: AnalysisResultSummary;
  errors?: AnalysisErrorType[];
  stats?: AnalysisResultStatType[];
  slocs?: number;
  tree?: AnalysisNode[];
  fileContent?: string[];
}

export type ScmKind = 'Subversion' | 'Gitlab' | 'Github' | 'Git' | 'Bitbucket';

export type CodeReviewAnnotationKind =
  | 'LongFunction'
  | 'ComplexFunction'
  | 'Duplicate'
  | 'Violation';

export interface CodeReviewAnnotation {
  codeReviewIdentifier?: number;
  kind: ScmKind;
  annotationKind?: CodeReviewAnnotationKind;
  filename?: string;
  line?: number;
  rule?: string;
  tool?: string;
  severity?: number;
  category?: ViolationCategory;
  description?: string;
}

export interface CodeReviewModification {
  codeReviewIdentifier?: number;
  kind?: ScmKind;
  filename?: string;
  linesAdded?: number;
  linesRemoved?: number;
  added?: boolean;
  removed?: boolean;
}

export interface CodeReview {
  id?: number;
  scmKind?: ScmKind;
  status?: AnalysisResultStatus;
  creationTimestampMs?: number;
  submitter?: string;
  sourceBranch?: string;
  targetBranch?: string;
  revision: string;
  url: string;
  annotations?: CodeReviewAnnotation[];
  annotationsCount?: number;
  modifications?: CodeReviewModification[];
  modificationsCount?: number;
}

export interface AnalysisCompare {
  id?: number;
  status?: AnalysisResultStatus;
  completion_time?: number;
  tags?: string;
  sourceKind?: ScmKind;
  sourceUrl?: string;
  sourceUsername?: string;
  sourcePassword?: string;
  sourceBranch?: string;
  sourceRevision?: string;
  targetKind?: ScmKind;
  targetUrl?: string;
  targetUsername?: string;
  targetPassword?: string;
  targetBranch?: string;
  targetRevision?: string;
  sourceAnalysis?: Analysis;
  targetAnalysis?: Analysis;
}

export interface FlattenedDuplicate {
  filename?: string;
  line?: number;
  lineCount?: number;
  code?: string;
}

export interface AnalysisDiff {
  addedViolations?: Violation[];
  removedViolations?: Violation[];
  addedDuplicates: FlattenedDuplicate[];
  removedDuplicates: FlattenedDuplicate[];
  addedComplexFunctions: ComplexFunction[];
  removedComplexFunctions: ComplexFunction[];
  addedLongFunctions: ComplexFunction[];
  removedLongFunctions: ComplexFunction[];
}

export interface GitlabMergeRequest {
  id?: number;
  gitlabId?: number;
  gitlabIid?: number;
  gitlabProjectId?: number;
  gitlabAuthorId?: number;
  gitlabAuthorUsername?: string;
  gitlabState?: string;
  gitlabMergeStatus?: string;
  gitlabSourceProjectId?: number;
  gitlabTargetProjectId?: number;
  sourcePath?: string;
  sourceUrl?: string;
  sourceBranch?: string;
  targetPath?: string;
  targetUrl?: string;
  targetBranch?: string;
  lastCommitRevision?: string;
  compareAnalysisId?: number;
  compareObject?: AnalysisCompare;
  analysisDiff?: AnalysisDiff;
  diff?: string;
}

export interface GitHubPullRequest {
  id?: number;
  githubPullRequestId?: number;
  submitterName?: string;
  sourceUrl?: string;
  sourceBranch?: string;
  sourceRevision?: string;
  targetUrl?: string;
  projectId?: number;
  targetBranch?: string;
  targetRevision?: string;
  compareAnalysisId?: number;
  compareObject?: AnalysisCompare;
  analysisDiff?: AnalysisDiff;
  diff?: string;
}

export interface BitbucketPullRequest {
  id?: number;
  bitbucketPullRequestId?: number;
  submitterName?: string;
  sourceFullname?: string;
  sourceBranch?: string;
  sourceRevision?: string;
  targetFullname?: string;
  projectId?: number;
  targetBranch?: string;
  targetRevision?: string;
  compareAnalysisId?: number;
  compareObject?: AnalysisCompare;
  analysisDiff?: AnalysisDiff;
  diff?: string;
}

export type AnalysisTrend = 'Unknown' | 'Worst' | 'Same' | 'Better';

export interface ProjectTrend {
  period?: number;
  value?: AnalysisTrend;
}

export interface Repository {
  name?: string;
  kind?: ScmKind;
  url?: string;
  defaultBranch?: string;
  creationDate?: number;
  username?: string;
  branches?: string[];
  hasWebhooks?: boolean;
  listOfRemoteBranches?: string[];
}

export interface ProjectConfiguration {
  key?: string;
  value?: string;
  valueBoolean?: boolean;
  valueFloat?: number;
}

export interface ViolationIgnore {
  filename?: string;
  description?: string;
  language?: LanguageEnumeration;
  rule?: string;
  prefix?: string;
  tool?: string;
}

export type ProjectNotificationEventType = 'AnalysisCompleted';
export type ProjectNotificationType = 'Email';
export type ProjectNotificationStatus = 'Confirmed' | 'Pending';

export interface ProjectNotification {
  eventType?: ProjectNotificationEventType;
  notificationType?: ProjectNotificationType;
  notificationValue?: string;
  status?: ProjectNotificationStatus;
  confirmation?: string;
}

export interface SlackIntegration {
  id?: number;
  team?: string;
  channel?: string;
  configurationUrl?: string;
}

export interface Project {
  id?: number;
  name?: string;
  public?: boolean;
  description?: string;
  status?: ProjectState;
  owner?: User;
  level?: UserLevel;
  analysesCount?: number;
  analyses?: Analysis[];
  codeReviews?: CodeReview[];
  codeReview?: CodeReview;
  codeReviewAuthors?: string[];
  codeReviewsCount?: number;
  githubPullRequest?: GitHubPullRequest;
  gitlabMergeRequest?: GitlabMergeRequest;
  bitbucketPullRequest?: BitbucketPullRequest;
  lastAnalysis?: Analysis;
  ownerLevel?: UserLevel;
  trend?: ProjectTrend;
  repository?: Repository;
  configuration?: ProjectConfiguration[];
  violationsToIgnore?: ViolationIgnore[];
  notifications?: ProjectNotification[];
  group?: Group;
  slackIntegrations?: SlackIntegration[];
}
