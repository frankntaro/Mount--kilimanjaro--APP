import { AdminInquiry } from './inquiryStorage';

export const DEFAULT_ADMIN_NOTIFICATION_EMAIL = 'biosfix14@gmail.com';
const STORAGE_NOTIFICATION_KEY = 'vamos_admin_notification_email';

/**
 * Returns the configured admin notification email, defaulting to biosfix14@gmail.com.
 */
export function getAdminNotificationEmail(): string {
  try {
    const custom = localStorage.getItem(STORAGE_NOTIFICATION_KEY) || localStorage.getItem('vamos_admin_email');
    if (custom && custom.trim().includes('@')) {
      return custom.trim().toLowerCase();
    }
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN_NOTIFICATION_EMAIL;
}

/**
 * Updates the admin notification email.
 */
export function setAdminNotificationEmail(email: string): void {
  try {
    const clean = email.trim().toLowerCase();
    localStorage.setItem(STORAGE_NOTIFICATION_KEY, clean);
    localStorage.setItem('vamos_admin_email', clean);
  } catch {
    // ignore
  }
}

export interface NotificationResult {
  success: boolean;
  recipient: string;
  message: string;
}

/**
 * Dispatches an email notification for any user contact, booking, or quote request
 * directly to the admin email (biosfix14@gmail.com).
 */
export async function sendAdminEmailNotification(inquiry: AdminInquiry): Promise<NotificationResult> {
  const recipient = getAdminNotificationEmail();

  const typeLabels: Record<AdminInquiry['type'], string> = {
    booking: 'Mount Kilimanjaro Booking Request',
    contact: 'General Website Contact Inquiry',
    custom_quote: 'Custom Tour / Safari Quote Request'
  };

  const subject = `[Vamos Kilimanjaro] New ${inquiry.type.toUpperCase()}: ${inquiry.fullName} (${inquiry.routeName || inquiry.safariAddon || inquiry.subject || 'Client Request'})`;

  const detailsPayload: Record<string, unknown> = {
    _subject: subject,
    _replyto: inquiry.email,
    _template: 'table',
    'Submission Type': typeLabels[inquiry.type] || inquiry.type,
    'Client Full Name': inquiry.fullName,
    'Client Email': inquiry.email,
    'Client Phone / WhatsApp': inquiry.phone,
    'Client Country / Origin': inquiry.country || 'Not specified',
    'Route / Tour Selected': inquiry.routeName || inquiry.safariAddon || 'General Inquiry',
    'Preferred Start Date': inquiry.startDate || 'Flexible',
    'Group Size (Travelers/Climbers)': inquiry.climbersCount || 1,
    'Gear Rental Included': inquiry.gearRental ? 'Yes (Full 4-Season Rental Bundle)' : 'No',
    'Estimated Total (USD)': inquiry.estimatedTotalUSD ? `$${inquiry.estimatedTotalUSD.toLocaleString()} USD` : 'Custom Quote Required',
    'Subject': inquiry.subject || 'N/A',
    'Client Message / Notes': inquiry.message || 'No additional notes provided',
    'Received At': new Date(inquiry.createdAt).toLocaleString('en-US', {
      timeZone: 'Africa/Dar_es_Salaam',
      dateStyle: 'full',
      timeStyle: 'medium'
    }) + ' (East Africa Time)'
  };

  try {
    // Use FormSubmit AJAX endpoint to deliver real email directly to biosfix14@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(detailsPayload)
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      console.log('Admin notification email sent successfully to', recipient, data);
      return {
        success: true,
        recipient,
        message: `Email notification sent successfully to ${recipient}`
      };
    } else {
      console.warn('FormSubmit returned status', response.status, 'for', recipient);
      return {
        success: false,
        recipient,
        message: `Notification gateway returned status ${response.status}`
      };
    }
  } catch (err) {
    console.error('Error dispatching admin email notification to', recipient, err);
    return {
      success: false,
      recipient,
      message: err instanceof Error ? err.message : 'Network error dispatching email'
    };
  }
}

/**
 * Generates a pre-filled mailto URL for direct email sending to the admin.
 */
export function generateAdminMailtoLink(inquiry: Partial<AdminInquiry>): string {
  const recipient = getAdminNotificationEmail();
  const subject = encodeURIComponent(`[Vamos Kilimanjaro] Request from ${inquiry.fullName || 'Client'}`);
  const body = encodeURIComponent(
    `Hello Vamos Kilimanjaro Team,\n\n` +
    `A new request has been submitted:\n` +
    `- Name: ${inquiry.fullName || 'N/A'}\n` +
    `- Email: ${inquiry.email || 'N/A'}\n` +
    `- Phone: ${inquiry.phone || 'N/A'}\n` +
    `- Tour/Route: ${inquiry.routeName || inquiry.safariAddon || 'N/A'}\n` +
    `- Date: ${inquiry.startDate || 'Flexible'}\n` +
    `- Group Size: ${inquiry.climbersCount || 1}\n` +
    `- Estimated Total: ${inquiry.estimatedTotalUSD ? '$' + inquiry.estimatedTotalUSD : 'Quote'}\n` +
    `- Message: ${inquiry.message || 'N/A'}\n\n` +
    `Please respond to the client at: ${inquiry.email || 'N/A'}`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/**
 * Sends a test email notification to verify delivery to biosfix14@gmail.com.
 */
export async function sendTestNotificationEmail(recipient?: string): Promise<NotificationResult> {
  const target = recipient || getAdminNotificationEmail();
  const testInquiry: AdminInquiry = {
    id: `test-${Date.now()}`,
    type: 'contact',
    fullName: 'Vamos Kilimanjaro Test Verification',
    email: 'system-test@vamoskilimanjaro.com',
    phone: '+255 754 123 456',
    country: 'Tanzania',
    subject: 'System Test: Admin Notification Delivery',
    message: 'This is a test notification to verify that contact and booking requests from website visitors are delivered directly to your inbox.',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  return sendAdminEmailNotification(testInquiry);
}
