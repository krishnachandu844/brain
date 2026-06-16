import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/me`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const res = await response.json();
        console.log(res);
        if (response.ok) {
          setUser(res.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return user;
};

export default useUser;
