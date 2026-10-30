// Small fetch wrapper for client components. Throws an Error with the server's message.
export async function api(path, { method = 'GET', body, form } = {}) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: form || (body ? JSON.stringify(body) : undefined),
    credentials: 'same-origin',
    cache: 'no-store',
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty or non-JSON response */
  }
  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = data?.errors;
    throw err;
  }
  return data;
}

// Tries to open WhatsApp right away (app on phones, WhatsApp Web on desktop). If the browser
// blocks the pop-up, the success screen still shows a big "Send on WhatsApp" button.
export function openWhatsApp(url) {
  try {
    window.open(url, '_blank', 'noopener');
  } catch {
    /* blocked – user taps the button instead */
  }
}
