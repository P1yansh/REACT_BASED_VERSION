

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';


async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem('urbanbite_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  
  if (response.status === 401 || response.status === 403) {
    
    if (!endpoint.includes('/auth/')) {
      localStorage.removeItem('urbanbite_token');
      localStorage.removeItem('urbanbite_user');
    }
  }

  return response;
}






export async function registerUser(data) {
  const res = await authFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Registration failed');
  return json;
}


export async function loginUser(email, password) {
  const res = await authFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
}


export async function getProfile() {
  const res = await authFetch('/auth/me');
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}






export async function getMenuByDay(day) {
  const res = await fetch(`${API_BASE}/menu?day=${encodeURIComponent(day)}`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}


export async function getFullMenu() {
  const res = await fetch(`${API_BASE}/menu/all`);
  if (!res.ok) throw new Error('Failed to fetch full menu');
  return res.json();
}






export async function getCalories() {
  const res = await fetch(`${API_BASE}/calories`);
  if (!res.ok) throw new Error('Failed to fetch calorie data');
  return res.json();
}






export async function getReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}


export async function postReview(data) {
  const res = await authFetch('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to submit review');
  return json;
}






export async function createOrder(data) {
  const res = await authFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create order');
  return json;
}


export async function getOrders() {
  const res = await authFetch('/orders');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}
