/**
 * Training programs (tabbed section + /training page).
 * Text via messages -> training.programs.<id>.{title,audience,learn[],projects,tools[],format,outcome}
 */
export interface TrainingProgram {
  id: string;
  icon: string;
  /** tools are brand names, not translated */
  tools: string[];
}

export const trainingPrograms: TrainingProgram[] = [
  { id: 'aiPrompt', icon: 'Brain', tools: ['ChatGPT', 'Claude', 'Gemini', 'Midjourney'] },
  { id: 'aiAutomation', icon: 'Workflow', tools: ['n8n', 'Make', 'Zapier', 'OpenAI API'] },
  { id: 'qaTesting', icon: 'ClipboardCheck', tools: ['Postman', 'Jira', 'TestRail'] },
  { id: 'automationTesting', icon: 'Bot', tools: ['Selenium', 'Playwright', 'Appium'] },
  { id: 'vibeCoding', icon: 'Terminal', tools: ['Cursor', 'Claude Code', 'v0', 'GitHub Copilot'] },
  { id: 'corporate', icon: 'Building2', tools: ['Custom stack', 'Odoo', 'Google Workspace'] },
];

/** Learning path (messages -> training.path.<id>). */
export const trainingPath = ['learn', 'practice', 'build', 'review', 'certify'] as const;

/** Delivery formats (messages -> training.formats.<id>). */
export const trainingFormats = [
  'public',
  'private',
  'corporate',
  'customized',
  'online',
  'inPerson',
] as const;
