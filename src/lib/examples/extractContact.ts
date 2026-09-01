/**
 * Pulls a name and an email out of what the visitor already typed.
 *
 * The assistant is told not to ask for either — the form below the chat takes
 * them. But people volunteer them anyway ("اسمي عبدالرحيم وهي ايميلي …"), and
 * making someone type the same thing twice two lines apart is the fastest way
 * to make a demo feel unfinished.
 *
 * Deliberately conservative: an empty field is fine, a wrong one is not. If a
 * pattern does not clearly match, nothing is filled and the visitor types it
 * themselves.
 */

const EMAIL = /[^\s<>()[\],;:@"]+@[^\s<>()[\],;:@"]+\.[a-z]{2,}/i;

/**
 * Arabic and English ways of introducing yourself.
 *
 * The capture stops at the next connector or punctuation, so
 * "اسمي عبدالرحيم وهي ايميلي x@y.com" yields "عبدالرحيم" and not the whole
 * sentence. The cut is `\s+و` — a space then waw — because Arabic joins the
 * conjunction to the following word ("وهي", "وبدي"). It deliberately does not
 * use \b: Arabic letters are not word characters in JavaScript regex, so word
 * boundaries land in the wrong places and the capture runs on.
 */
const NAME_PATTERNS = [
  /(?:اسمي|إسمي|أسمي)\s+([^\n,،.]{2,40}?)(?=\s+و|\s+اي?ميلي|\s+إيميلي|[,،.]|$)/,
  /(?:أنا|انا)\s+([^\n,،.]{2,40}?)(?=\s+و|\s+اي?ميلي|\s+إيميلي|[,،.]|$)/,
  /(?:my name is|i am|i'm)\s+([^\n,.]{2,40}?)(?=\s+and\s|[,.]|$)/i,
];

/**
 * Words that mean the capture grabbed a sentence, not a name — "انا بدي احجز"
 * is a request, not an introduction.
 *
 * No \b around the Arabic for the same reason as above: it does not bind to
 * Arabic letters, so the guard would never fire.
 */
const NOT_A_NAME = /(بدي|بدّي|حابب|عايز|أريد|اريد|احجز|أحجز|موعد)|\b(want|book|appointment)\b/i;

export function extractContact(texts: string[]): { name?: string; email?: string } {
  const out: { name?: string; email?: string } = {};

  for (const text of texts) {
    if (!out.email) {
      const m = text.match(EMAIL);
      if (m) out.email = m[0].toLowerCase();
    }

    // Take the address out before looking for a name, so a trailing
    // "…@gmail.com" can never end up inside one.
    const withoutEmail = text.replace(EMAIL, ' ');

    if (!out.name) {
      for (const pattern of NAME_PATTERNS) {
        const m = withoutEmail.match(pattern);
        const candidate = m?.[1]?.trim();
        if (candidate && candidate.length >= 2 && !NOT_A_NAME.test(candidate)) {
          out.name = candidate;
          break;
        }
      }
    }
  }

  return out;
}
