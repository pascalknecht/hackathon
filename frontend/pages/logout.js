import React, { useEffect } from "react";
// Chakra imports
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]); // All the magic is here

  return <div>Logging out</div>;
}
