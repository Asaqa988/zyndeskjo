/**
 * Editable metric placeholders. Values are UI examples — NOT audited facts.
 * Replace `value` with real figures before production. Labels are i18n keys
 * resolved from messages -> metrics.items.<key>.
 */
export interface Metric {
  key: string;
  value: number;
  suffix: string;
  /** true => show `~`/`+`/`%` exactly as suffix; drives count-up animation */
  decimals?: number;
}

export const metrics: Metric[] = [
  { key: 'professionalsTrained', value: 500, suffix: '+' },
  { key: 'projectsDelivered', value: 40, suffix: '+' },
  { key: 'workflowsAutomated', value: 120, suffix: '+' },
  { key: 'clientSatisfaction', value: 98, suffix: '%' },
  { key: 'trainingHours', value: 3000, suffix: '+' },
];
