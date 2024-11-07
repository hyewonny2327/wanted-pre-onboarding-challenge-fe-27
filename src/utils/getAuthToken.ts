export function getAuthToken() {
  const token = localStorage.getItem('authToken');
  if (token) {
    return token;
  }
  return null;
}
