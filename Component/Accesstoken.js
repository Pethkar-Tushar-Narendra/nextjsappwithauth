import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AccessToken() {
  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // Parse the JSON from the response
        const data = await response.json();
        // Log the data to the console
        console.log(data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return <div>Access Token: {data?.accessToken || "No token"}</div>;
}
