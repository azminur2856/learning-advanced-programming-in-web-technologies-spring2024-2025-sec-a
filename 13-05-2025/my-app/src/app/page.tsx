"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("./home");
  };

  return (
    <div>
      <p>Welcome Home</p>

      {/* Link */}
      <Link href="./home">Users</Link>

      <br />
      <br />

      {/* Button */}
      <button onClick={handleButtonClick}>Go to Users</button>
    </div>
  );
};

export default Home;
