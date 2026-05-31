export async function submitSignUp(values: {
  email: string;
  username: string;
  password: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/v1/signup`,
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
    throw new Error(data.message || "Signup failed");
  }
  return data;
}
