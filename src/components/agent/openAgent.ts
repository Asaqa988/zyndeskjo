/**
 * Tiny bridge so anything on the page can open the assistant.
 *
 * A window event rather than context/state, because the widget lives in the
 * layout while callers (the hero card, CTAs) live deep inside page trees —
 * threading a provider through for one boolean would be heavier than this.
 */

export const AGENT_OPEN_EVENT = 'zyn:open';

export type AgentOpenMode = 'chat' | 'voice';

export interface AgentOpenDetail {
  mode?: AgentOpenMode;
  /** Sent as the visitor's first message, so a suggested question answers itself. */
  question?: string;
}

export function openAgent(mode: AgentOpenMode = 'chat', question?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<AgentOpenDetail>(AGENT_OPEN_EVENT, { detail: { mode, question } })
  );
}
