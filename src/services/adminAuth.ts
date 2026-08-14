export interface AdminCredentials {
  email: string;
  password: string;
  lastUpdated?: string;
}

const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  email: 'admin@vamoskilimanjaro.com',
  password: 'vamoskilimanjaro',
};

const CREDENTIALS_STORAGE_KEY = 'vamos_admin_credentials';
const SESSION_AUTH_KEY = 'vamos_admin_authenticated';
const SESSION_EMAIL_KEY = 'vamos_admin_session_email';

export function getAdminCredentials(): AdminCredentials {
  try {
    const saved = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.email && parsed.password) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN_CREDENTIALS;
}

export function updateAdminCredentials(email: string, password: string): { success: boolean; message?: string } {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please provide a valid email address.' };
  }
  if (!password || password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  try {
    localStorage.setItem(
      CREDENTIALS_STORAGE_KEY,
      JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password.trim(),
        lastUpdated: new Date().toISOString(),
      })
    );
    return { success: true };
  } catch {
    return { success: false, message: 'Failed to save credentials to local storage.' };
  }
}

export function verifyAdminLogin(emailInput: string, passwordInput: string): boolean {
  const current = getAdminCredentials();
  const cleanEmail = (emailInput || '').trim().toLowerCase();
  const cleanPass = (passwordInput || '').trim();

  return cleanEmail === current.email.toLowerCase() && cleanPass === current.password;
}

export function checkIsAdminAuthenticated(): boolean {
  try {
    const isSession = sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    const isLocal = localStorage.getItem(SESSION_AUTH_KEY) === 'true';
    return isSession || isLocal;
  } catch {
    return false;
  }
}

export function getAdminSessionEmail(): string {
  try {
    return (
      sessionStorage.getItem(SESSION_EMAIL_KEY) ||
      localStorage.getItem(SESSION_EMAIL_KEY) ||
      getAdminCredentials().email
    );
  } catch {
    return getAdminCredentials().email;
  }
}

export function setAdminAuthenticatedSession(rememberMe: boolean, email: string): void {
  try {
    if (rememberMe) {
      localStorage.setItem(SESSION_AUTH_KEY, 'true');
      localStorage.setItem(SESSION_EMAIL_KEY, email);
    } else {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      sessionStorage.setItem(SESSION_EMAIL_KEY, email);
    }
  } catch {
    // ignore
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    sessionStorage.removeItem(SESSION_EMAIL_KEY);
    localStorage.removeItem(SESSION_AUTH_KEY);
    localStorage.removeItem(SESSION_EMAIL_KEY);
  } catch {
    // ignore
  }
}
