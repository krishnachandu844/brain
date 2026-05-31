export async function submitSignin(values: {
  username: string;
  password: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/signin`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "signin failed");
  }
  return data;
}
