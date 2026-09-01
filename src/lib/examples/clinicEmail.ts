import { CLINIC } from '@/data/examples/clinic';

/**
 * The email the clinic demo sends.
 *
 * Written for mail clients: tables, every style inline, no images, no external
 * CSS. Direction is set per element because Gmail drops <html> and <body> and
 * reparents the content, which leaves an RTL page rendering flush left.
 *
 * It opens by saying it is a demonstration, and it says so again at the end.
 * The clinic and the doctor are real and gave permission; the person receiving
 * this did not agree to anything, and an email that says "your appointment is
 * confirmed" can put someone in a real waiting room for an appointment that
 * does not exist. Marking it also makes it a better thing to show a prospect —
 * this is exactly what their patients would get, minus the pretence.
 */

const TEAL = '#146b6b';
const ACCENT = '#2fa39d';
const INK = '#10262b';
const MUTED = '#5a7480';
const LINE = '#dde8e9';
const PAGE = '#f2f7f7';
const AMBER = '#8a6100';
const AMBER_BG = '#fdf6e3';

const RTL = 'dir="rtl" style="text-align:right;';

const row = (label: string, value: string) => `
<tr>
  <td ${RTL}padding:0 0 10px;width:38%;font:700 14px/1.6 Tahoma,Arial,sans-serif;color:${INK};white-space:nowrap;">${label}</td>
  <td ${RTL}padding:0 0 10px;font:400 14px/1.6 Tahoma,Arial,sans-serif;color:${MUTED};">${value}</td>
</tr>`;

/**
 * @param p.name     Who asked for the appointment.
 * @param p.service  Which treatment they picked.
 * @param p.note     Anything they added, optional.
 */
export function buildClinicEmail({
  name,
  service,
  note = '',
}: {
  name: string;
  service: string;
  note?: string;
}): string {
  const maps = `https://www.google.com/maps/search/${encodeURIComponent(CLINIC.address)}`;

  return `<!doctype html>
<html dir="rtl" lang="ar"><body style="margin:0;padding:0;background:${PAGE};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl" style="background:${PAGE};">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" dir="rtl"
       style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${LINE};border-radius:14px;overflow:hidden;">

  <tr><td ${RTL}background:${AMBER_BG};border-bottom:1px solid #f0e2bd;padding:12px 26px;font:700 13px/1.6 Tahoma,Arial,sans-serif;color:${AMBER};">
    هذه رسالة من عرض توضيحي — لم يُحجز أي موعد حقيقي
  </td></tr>

  <tr><td ${RTL}background:${TEAL};padding:26px 28px;">
    <div style="font:700 21px/1.35 Tahoma,Arial,sans-serif;color:#ffffff;">${CLINIC.clinic}</div>
    <div style="font:400 14px/1.6 Tahoma,Arial,sans-serif;color:#bfe0de;padding-top:6px;">
      ${CLINIC.speciality} — خلدا، عمّان
    </div>
  </td></tr>

  <tr><td ${RTL}padding:26px 28px 4px;">
    <p ${RTL}margin:0 0 6px;font:700 17px/1.5 Tahoma,Arial,sans-serif;color:${INK};">أهلاً ${name} 👋</p>
    <p ${RTL}margin:0;font:400 15px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      وصلنا طلب موعدك في عيادة ${CLINIC.doctor}. رح يتواصل معك فريق العيادة
      على رقمك لتثبيت الوقت الي بيناسبك.
    </p>
  </td></tr>

  <tr><td style="padding:20px 28px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl"
           style="background:${PAGE};border:1px solid ${LINE};border-radius:12px;">
      <tr><td style="padding:18px 20px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="rtl">
          ${row('الخدمة', service)}
          ${row('الطبيب', CLINIC.doctor)}
          ${note ? row('ملاحظتك', note) : ''}
          ${row('الحالة', 'بانتظار التأكيد بالاتصال')}
        </table>
      </td></tr>
    </table>
  </td></tr>

  <tr><td ${RTL}padding:22px 28px 0;">
    <div style="font:700 16px/1.4 Tahoma,Arial,sans-serif;color:${INK};padding-bottom:10px;">وين العيادة</div>
    <p ${RTL}margin:0 0 6px;font:400 14px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      ${CLINIC.address}
    </p>
    <p ${RTL}margin:0;font:400 14px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      للاتصال أو الواتساب: <a href="tel:${CLINIC.phoneHref}" style="color:${ACCENT};text-decoration:none;">${CLINIC.phone}</a>
    </p>
  </td></tr>

  <tr><td align="center" style="padding:22px 28px 6px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" dir="rtl"><tr>
      <td style="padding:0 5px;">
        <a href="${maps}"
           style="display:inline-block;background:${TEAL};color:#ffffff;text-decoration:none;padding:13px 24px;border-radius:999px;font:700 14px/1 Tahoma,Arial,sans-serif;">
          افتح الموقع على الخريطة
        </a>
      </td>
      <td style="padding:0 5px;">
        <a href="${CLINIC.website}"
           style="display:inline-block;background:#ffffff;color:${TEAL};text-decoration:none;padding:12px 22px;border-radius:999px;border:1px solid ${LINE};font:700 14px/1 Tahoma,Arial,sans-serif;">
          موقع العيادة
        </a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td ${RTL}padding:18px 28px 24px;">
    <p ${RTL}margin:0;font:400 13px/1.8 Tahoma,Arial,sans-serif;color:${MUTED};">
      الفحص والاستشارة الأولى مجانيان.
    </p>
  </td></tr>

  <tr><td ${RTL}border-top:1px solid ${LINE};padding:18px 28px;background:${PAGE};">
    <p ${RTL}margin:0 0 8px;font:700 13px/1.7 Tahoma,Arial,sans-serif;color:${AMBER};">
      تنويه: هذه رسالة من عرض توضيحي.
    </p>
    <p ${RTL}margin:0;font:400 13px/1.7 Tahoma,Arial,sans-serif;color:${MUTED};">
      وصلتك لأنك جرّبت مساعد الحجز على zyndeskjo.com. معلومات العيادة والطبيب
      حقيقية ومأخوذة من موقع العيادة بموافقة ${CLINIC.doctor}، لكن <strong>لم
      يُحجز أي موعد فعلي ولن يتصل بك أحد</strong>. للحجز الحقيقي، اتصل بالعيادة
      مباشرة على ${CLINIC.phone}.
      <br><br>
      العرض من إعداد Zyndesk — أتمتة وذكاء اصطناعي للأعمال، عمّان.
    </p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}
