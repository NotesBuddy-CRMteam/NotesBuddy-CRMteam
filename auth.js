const PASSKEY = "irwin";
const AUTH_KEY = "notesbuddy_auth";
const AUTH_EXPIRY_KEY = "notesbuddy_expiry";
const AUTH_DURATION_HOURS = 12;

// Call this on protected pages
function requireAuth() {
  // Check expiry
  const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
  const now = Date.now();
  if (!localStorage.getItem(AUTH_KEY) || !expiry || now > parseInt(expiry)) {
    clearAuth();
    window.location.href = "login.html";
    return false;
  }
  // Extend session (sliding window)
  localStorage.setItem(AUTH_EXPIRY_KEY, now + AUTH_DURATION_HOURS*60*60*1000);
  return true;
}

// Call this to store auth
function setAuth() {
  localStorage.setItem(AUTH_KEY, "1");
  localStorage.setItem(AUTH_EXPIRY_KEY, Date.now() + AUTH_DURATION_HOURS*60*60*1000);
}

// Call this to clear auth (logout)
function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_EXPIRY_KEY);
}