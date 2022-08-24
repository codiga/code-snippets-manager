import {
  Analysis,
  AnalysisResultSummary,
  Project,
} from '../types/projectTypes';

export function getPublicUserProjectsWithScore(ownedProjects?: Project[]) {
  if (!ownedProjects) return [];

  return ownedProjects.filter(
    (project) =>
      project.lastAnalysis &&
      project.lastAnalysis.techdebt &&
      project.lastAnalysis.techdebt.score &&
      project.repository
  );
}

export function getAverageViolation(
  totalViolations: number,
  projectsWithScore: Project[],
  key: (summary: AnalysisResultSummary) => number
) {
  const totalDocumentationViolations = projectsWithScore
    .map((p) => key(p!.lastAnalysis!.summary!))
    .reduce((a, b) => a + b, 0);

  let averageScore = 0;

  if (totalViolations > 0) {
    averageScore = Math.trunc(
      (totalDocumentationViolations * 100) / totalViolations
    );
  }

  return averageScore;
}

export function getAverageViolations(projectsWithScore: Project[]) {
  const totalViolations = projectsWithScore
    .map((p) => p!.lastAnalysis!.violationsCount)
    .reduce((a, b) => a! + b!, 0);

  /**
   * Average Quality Score for the user
   */
  const totalScore = projectsWithScore
    .map((p) => p!.lastAnalysis!.techdebt!.score)
    .reduce((a, b) => a! + b!, 0);

  const averageScore = Math.trunc(totalScore! / projectsWithScore.length);

  /**
   * Score for documentation
   */
  const averageDocumentationScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsDocumentation!
  );

  /**
   * Score for security
   */
  const averageSecurityScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsSecurity!
  );

  /**
   * Score for error prone
   */
  const averageErrorProneScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsError_prone!
  );

  /**
   * Score for safety
   */
  const averageSafetyScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsSafety!
  );

  /**
   * Score for best practice
   */
  const averageBestPracticeScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsBest_practice!
  );

  /**
   * Score for code style
   */
  const averageCodeStyleScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsCode_style!
  );

  /**
   * Score for design
   */
  const averageDesignScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsDesign!
  );

  /**
   * Score for performance
   */
  const averagePerformanceScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsPerformance!
  );

  /**
   * Score for unknown
   */
  const averageUnknownScore = getAverageViolation(
    totalViolations!,
    projectsWithScore,
    (summary) => summary.violationsUnknown!
  );

  return {
    count: totalViolations!,
    average: averageScore,
    security: averageSecurityScore,
    documentation: averageDocumentationScore,
    errorProne: averageErrorProneScore,
    safety: averageSafetyScore,
    bestPractices: averageBestPracticeScore,
    codeStyle: averageCodeStyleScore,
    design: averageDesignScore,
    performance: averagePerformanceScore,
    unknown: averageUnknownScore,
  };
}

/**
 * Get the ratio of violations per category for an analysis.
 * We need to pass an analysis with a complete summary as a parameter.
 *
 * @param {*} analysis
 * @returns
 */
export function getViolationsCategoryRatio(analysis: Analysis) {
  const violationsCount = analysis.violationsCount!;

  const ratioSecurityDouble =
    (analysis.summary!.violationsSecurity! * 100) / violationsCount;
  const ratioSecurityViolations = Math.ceil(ratioSecurityDouble);

  const ratioDocumentationDouble =
    (analysis.summary!.violationsDocumentation! * 100) / violationsCount;
  const ratioDocumentationViolations = Math.ceil(ratioDocumentationDouble);

  const ratioErrorProneDouble =
    (analysis.summary!.violationsError_prone! * 100) / violationsCount;
  const ratioErrorProneViolations = Math.ceil(ratioErrorProneDouble);

  const ratioDeploymentDouble =
    (analysis.summary!.violationsDeployment! * 100) / violationsCount;
  const ratioDeploymentViolations = Math.ceil(ratioDeploymentDouble);

  const ratioCodeStyleDouble =
    (analysis.summary!.violationsCode_style! * 100) / violationsCount;
  const ratioCodeStyleViolations = Math.ceil(ratioCodeStyleDouble);

  const ratioBestPracticeDouble =
    (analysis.summary!.violationsBest_practice! * 100) / violationsCount;
  const ratioBestPracticeViolations = Math.ceil(ratioBestPracticeDouble);

  const ratioSafetyDouble =
    (analysis.summary!.violationsSafety! * 100) / violationsCount;
  const ratioSafetyViolations = Math.ceil(ratioSafetyDouble);

  const ratioDesignDouble =
    (analysis.summary!.violationsDesign! * 100) / violationsCount;
  const ratioDesignViolations = Math.ceil(ratioDesignDouble);

  const ratioPerformanceDouble =
    (analysis.summary!.violationsPerformance! * 100) / violationsCount;
  const ratioPerformanceViolations = Math.ceil(ratioPerformanceDouble);

  const ratioUnknownDouble =
    (analysis.summary!.violationsUnknown! * 100) / violationsCount;
  const ratioUnknownViolations = Math.ceil(ratioUnknownDouble);

  return {
    security: ratioSecurityViolations,
    documentation: ratioDocumentationViolations,
    errorProne: ratioErrorProneViolations,
    safety: ratioSafetyViolations,
    bestPractices: ratioBestPracticeViolations,
    codeStyle: ratioCodeStyleViolations,
    design: ratioDesignViolations,
    deployment: ratioDeploymentViolations,
    performance: ratioPerformanceViolations,
    unknown: ratioUnknownViolations,
  };
}

export function getSeverityRatio(analysis: Analysis) {
  const ratioDoubleSeverity1 =
    (analysis.summary!.violationsSeverity1! * 100) / analysis.violationsCount!;
  const ratioSeverity1 = Math.ceil(ratioDoubleSeverity1);

  const ratioDoubleSeverity2 =
    (analysis.summary!.violationsSeverity2! * 100) / analysis.violationsCount!;
  const ratioSeverity2 = Math.ceil(ratioDoubleSeverity2);

  const ratioDoubleSeverity3 =
    (analysis.summary!.violationsSeverity3! * 100) / analysis.violationsCount!;
  const ratioSeverity3 = Math.ceil(ratioDoubleSeverity3);

  const ratioDoubleSeverity4 =
    (analysis.summary!.violationsSeverity4! * 100) / analysis.violationsCount!;
  const ratioSeverity4 = Math.ceil(ratioDoubleSeverity4);
  return {
    severity1: ratioSeverity1,
    severity2: ratioSeverity2,
    severity3: ratioSeverity3,
    severity4: ratioSeverity4,
  };
}
