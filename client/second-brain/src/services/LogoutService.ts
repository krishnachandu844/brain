export async function LogOut() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Logout Failed");
  }
  return data;
}
