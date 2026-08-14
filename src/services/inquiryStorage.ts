import { sendAdminEmailNotification, getAdminNotificationEmail } from './notificationService';

export interface AdminInquiry {
  id: string;
  type: 'booking' | 'contact' | 'custom_quote';
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  routeName?: string;
  safariAddon?: string;
  startDate?: string;
  climbersCount?: number;
  gearRental?: boolean;
  subject?: string;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedTotalUSD?: number;
  emailNotified?: boolean;
  notifiedTo?: string;
}

const STORAGE_KEY = 'vamos_admin_inquiries';

export function getStoredInquiries(): AdminInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNewInquiry(inquiry: Omit<AdminInquiry, 'id' | 'createdAt' | 'status'> & { status?: AdminInquiry['status'] }): AdminInquiry {
  const current = getStoredInquiries();
  const targetEmail = getAdminNotificationEmail();

  const newEntry: AdminInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: new Date().toISOString(),
    status: inquiry.status || 'new',
    emailNotified: true,
    notifiedTo: targetEmail
  };

  const updated = [newEntry, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save inquiry to storage', err);
  }

  // Automatically dispatch notification email to biosfix14@gmail.com asynchronously
  sendAdminEmailNotification(newEntry).catch((err) => {
    console.warn('Async admin email notification failed to send', err);
  });

  return newEntry;
}

export function updateInquiryStatus(id: string, status: AdminInquiry['status']): AdminInquiry[] {
  const current = getStoredInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update inquiry status', err);
  }
  return updated;
}

export function deleteInquiry(id: string): AdminInquiry[] {
  const current = getStoredInquiries();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete inquiry', err);
  }
  return updated;
}

export function clearAllInquiries(): AdminInquiry[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear inquiries', err);
  }
  return [];
}

