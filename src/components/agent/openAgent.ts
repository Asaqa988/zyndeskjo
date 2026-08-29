/**
 * Tiny bridge so anything on the page can open the assistant.
 *
 * A window event rather than context/state, because the widget lives in the
 * layout while callers (the hero card, CTAs) live deep inside page trees —
 * threading a provider through for one boolean would be heavier than this.
 */

export const AGENT_OPEN_EVENT = 'zyn:open';

export type AgentOpenMode = 'chat' | 'voice';

export function openAgent(mode: AgentOpenMode = 'chat') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<AgentOpenMode>(AGENT_OPEN_EVENT, { detail: mode }));
}
