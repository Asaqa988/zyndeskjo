/**
 * Builds the HTML for the course-details email.
 *
 * This is the source of truth for that email. scripts/build-course-email.mjs
 * inlines it into the "Prepare" Code node of the Course info workflow, which
 * hands `html` to the Gmail node — Code nodes cannot import, so that copy is
 * generated rather than maintained.
 *
 * Written for email clients, not browsers: tables for layout, every style
 * inline, no external CSS or fonts, no images. Gmail strips <style> blocks in
 * some contexts and clips messages past ~102 KB, so the whole thing stays
 * small and self-contained. Colours are hard-coded rather than tokenised
 * because there is no cascade to inherit from.
 *
 * Direction is set element by element. Gmail drops the <html> and <body> tags
 * and reparents the content, so `dir="rtl"` up there is gone by the time
 * anyone reads it — which left every block aligned to the left and put the
 * ticks and the numbering on the wrong side of the text.
 */

const NAVY = '#17324f';
const CYAN = '#1aa3b8';
const INK = '#0f2233';
const MUTED = '#5b7186';
const LINE = '#dfe7ee';
const PAGE = '#f4f7fa';

/** Arabic-Indic digits, so a generated number sits beside the written ones. */
const ar = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);

/** Every block of prose starts on the right and reads right to left. */
const RTL = 'dir="rtl" style="text-align:right;';

/** One of the six numbers, as a table cell. */
const fact = (value, label) => `
<td width="33.33%" style="padding:0 4px 8px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background:#ffffff;border:1px solid ${LINE};border-radius:10px;">
    <tr><td align="center" dir="rtl" style="padding:14px 6px;text-align:center;">
      <div style="font:700 20px/1.2 Tahoma,Arial,sans-serif;color:${INK};">${value}</div>
      <div style="font:400 12px/1.4 Tahoma,Arial,sans-serif;color:${MUTED};padding-top:4px;">${label}</div>
    </td></tr>
  </table>
</td>`;

const bullet = (text) => `
<tr><td ${RTL}padding:0 0 8px;font:400 14px/1.7 Tahoma,Arial,sans-serif;color:${MUTED};">
  <span style="color:${CYAN};font-weight:700;">✓</span>&nbsp; ${text}
</td></tr>`;

const moduleRow = (n, title) => `
<tr><td ${RTL}padding:0 0 7px;font:400 14px/1.6 Tahoma,Arial,sans-serif;color:${MUTED};">
  <span style="display:inline-block;min-width:22px;font-weight:700;color:${NAVY};">${ar(n)}.</span> ${title}
</td></tr>`;

/** "بعد ٨ أيام" is right for a few days and wrong for one, two, or eleven. */
function countdownLine(days) {
  if (days === 1) return 'يبدأ غداً';
  if (days === 2) return 'يبدأ بعد يومين';
  if (days <= 10) return `يبدأ بعد ${ar(days)} أيام`;
  return `يبدأ بعد ${ar(days)} يوماً`;
}

/**
 * @param {object} p
 * @param {string} p.gapLine  Optional opening line about what they were missing.
 * @param {number} p.days     Days until the first session; 0 hides the line.
 */
function buildEmail({ gapLine = '', days = 0 } = {}) {
  const modules = [
    'الدخول إلى عالم الـ AI Automation',
    'ربط الأدوات والصلاحيات — Credentials',
    'أساسيات n8n من الصفر',
    'مهارات n8n المتقدمة',
    'مشاريع حقيقية — البريد و Messenger',
    'WhatsApp و Telegram وأتمتة الأعمال',
    'كورس الاحتراف — SaaS ومتعدّد العملاء',
    'أتمتة السوشال ميديا',
    'المواقع والمتاجر الإلكترونية',
    'من المهارة إلى العميل',
  ];

  const included = [
    'محاضرات مباشرة أونلاين عبر Zoom',
    '٤ مختبرات عملية تبني فيها بإيدك',
    'مشروعان نهائيان',
    'تسجيلات تبقى معك بعد انتهاء الكورس',
    'دعم ومتابعة طول الكورس',
    'شهادة موقّعة ومختومة من Zyndesk',
  ];

  return `<!doctype html>
<html dir="rtl" lang="ar"><body style="margin:0;padding:0;background:${PAGE};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="background:${PAGE};">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" dir="rtl"
       style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${LINE};border-radius:14px;overflow:hidden;">

  <tr><td ${RTL}background:${NAVY};padding:26px 28px;">
    <div style="font:700 22px/1.35 Tahoma,Arial,sans-serif;color:#ffffff;">AI Automation و n8n</div>
    <div style="font:400 14px/1.6 Tahoma,Arial,sans-serif;color:#c5d6e4;padding-top:6px;">
      من الصفر إلى بناء أنظمة أتمتة حقيقية وبيعها كخدمة
    </div>
  </td></tr>

  ${days > 0 ? `<tr><td ${RTL}background:${CYAN};padding:11px 28px;font:700 14px/1.4 Tahoma,Arial,sans-serif;color:#ffffff;">
    ${countdownLine(days)} — ٧ سبتمبر ٢٠٢٦
  </td></tr>` : ''}

  <tr><td ${RTL}padding:26px 28px 6px;">
    ${gapLine ? `<p ${RTL}margin:0 0 14px;padding:12px 14px;background:${PAGE};border-right:3px solid ${CYAN};border-radius:8px;font:400 14px/1.7 Tahoma,Arial,sans-serif;color:${INK};">${gapLine}</p>` : ''}
    <p ${RTL}margin:0;font:400 15px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      مرحباً، طلبت تفاصيل الكورس — وهي كلها بهالرسالة.
    </p>
  </td></tr>

  <tr><td style="padding:18px 24px 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl"><tr>
      ${fact('٧ سبتمبر', 'تاريخ البداية')}
      ${fact('٦٦', 'ساعة تدريب')}
      ${fact('١٣٠', 'ديناراً أردنياً')}
    </tr><tr>
      ${fact('١٠', 'وحدات · ٩٣ درساً')}
      ${fact('٨', 'مختبرات عملية')}
      ${fact('٣٠', 'مقعداً فقط')}
    </tr></table>
  </td></tr>

  <tr><td ${RTL}padding:12px 28px 0;">
    <p ${RTL}margin:0 0 6px;font:400 14px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      <strong style="color:${INK};">المواعيد:</strong> الأحد – الأربعاء، ٨:٠٠ – ١٠:٠٠ مساءً بتوقيت الأردن، أونلاين مباشر عبر Zoom.
    </p>
    <p ${RTL}margin:0;font:400 14px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      <strong style="color:${INK};">المتطلبات:</strong> ما في. الكورس مفتوح للجميع، بدون خبرة سابقة ولا خلفية برمجة.
    </p>
  </td></tr>

  <tr><td ${RTL}padding:22px 28px 0;">
    <div style="font:700 16px/1.4 Tahoma,Arial,sans-serif;color:${INK};padding-bottom:12px;">شو بيتضمّن</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl">
      ${included.map(bullet).join('')}
    </table>
  </td></tr>

  <tr><td ${RTL}padding:22px 28px 0;">
    <div style="font:700 16px/1.4 Tahoma,Arial,sans-serif;color:${INK};padding-bottom:12px;">المنهاج — ١٠ وحدات</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl">
      ${modules.map((m, i) => moduleRow(i + 1, m)).join('')}
    </table>
  </td></tr>

  <tr><td align="center" style="padding:26px 28px 8px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" dir="rtl"><tr>
      <td style="padding:0 5px;">
        <a href="https://wa.link/4x7mx5"
           style="display:inline-block;background:${NAVY};color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:999px;font:700 14px/1 Tahoma,Arial,sans-serif;">
          سجّل عبر واتساب
        </a>
      </td>
      <td style="padding:0 5px;">
        <a href="https://www.zyndeskjo.com/ar/what-you-build"
           style="display:inline-block;background:#ffffff;color:${NAVY};text-decoration:none;padding:12px 24px;border-radius:999px;border:1px solid ${LINE};font:700 14px/1 Tahoma,Arial,sans-serif;">
          شوف شو رح تبني
        </a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:18px 28px 26px;">
    <p dir="rtl" style="margin:0;font:400 13px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};text-align:center;">
      المنهاج كامل: <a href="https://www.zyndeskjo.com/ar/learn" style="color:${CYAN};">zyndeskjo.com/ar/learn</a>
    </p>
  </td></tr>

  <tr><td ${RTL}border-top:1px solid ${LINE};padding:18px 28px;background:${PAGE};">
    <p ${RTL}margin:0;font:400 13px/1.7 Tahoma,Arial,sans-serif;color:${MUTED};">
      عبدالرحيم السقا — Zyndesk، عمّان<br>
      وصلتك هالرسالة لأنك طلبت تفاصيل الكورس من zyndeskjo.com. ردّ عليها بأي سؤال.
    </p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

export { buildEmail };
