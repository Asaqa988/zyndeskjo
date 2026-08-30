/**
 * Text fixes applied at the moment of speaking, not before.
 *
 * The written answer and the spoken answer want different things from a phone
 * number. On screen "0797700235" is right — it is what you dial and what you
 * copy. Read aloud in Arabic it becomes a single enormous quantity, hundreds
 * of millions, and the listener has no way to write it down. English speech
 * happens to read the same string digit by digit, which is why this only
 * touches Arabic.
 *
 * So the transcript keeps the digits and only the audio gets the words.
 */

/** Arabic digit names, in the plain form people use when dictating. */
const ARABIC_DIGITS = [
  'صفر',
  'واحد',
  'اثنين',
  'ثلاثة',
  'أربعة',
  'خمسة',
  'ستة',
  'سبعة',
  'ثمانية',
  'تسعة',
];

/** Arabic-Indic ٠-٩ as well as ASCII 0-9 — the model writes either. */
function digitValue(ch: string): number | null {
  const code = ch.codePointAt(0);
  if (code === undefined) return null;
  if (code >= 0x30 && code <= 0x39) return code - 0x30; // 0-9
  if (code >= 0x0660 && code <= 0x0669) return code - 0x0660; // ٠-٩
  return null;
}

/**
 * A run of digits that may carry separators — "+962 7 9770 0235", "0797700235",
 * "079-770-0235". Length is checked after the fact, on the digits alone.
 */
const NUMBER_RUN = /[+]?[\d٠-٩][\d٠-٩\s .\-()]{4,}[\d٠-٩]/g;

/**
 * Seven digits is the shortest thing anyone would call a phone number, and it
 * sits safely above the numbers that legitimately appear in an answer: a year
 * (2026) is four, a fee (130) is three, an hour range (60–80) is two apiece.
 * Those must keep being read as quantities.
 */
const MIN_PHONE_DIGITS = 7;

/** How a Jordanian mobile is said out loud: 0797 700 235. */
function group(digits: number[]): number[][] {
  const groups: number[][] = [];
  const shape = digits.length === 10 && digits[0] === 0 ? [4, 3, 3] : null;

  if (shape) {
    let at = 0;
    for (const size of shape) {
      groups.push(digits.slice(at, at + size));
      at += size;
    }
    return groups;
  }

  for (let at = 0; at < digits.length; at += 3) {
    groups.push(digits.slice(at, at + 3));
  }
  return groups;
}

/**
 * Replaces phone numbers with their digits spelled out, so Arabic speech reads
 * them one at a time. Commas between groups give the voice somewhere to
 * breathe, which is what makes a number possible to write down.
 *
 * Anything that is not Arabic, and any number too short to be a phone number,
 * is returned untouched.
 */
export function spellNumbersForSpeech(text: string, locale: string): string {
  if (locale !== 'ar') return text;

  return text.replace(NUMBER_RUN, (run) => {
    const digits = [...run].map(digitValue).filter((d): d is number => d !== null);
    if (digits.length < MIN_PHONE_DIGITS) return run;

    return group(digits)
      .map((chunk) => chunk.map((d) => ARABIC_DIGITS[d]).join(' '))
      .join('، ');
  });
}
