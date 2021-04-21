import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userName = useSelector((state) => state.auth.userData.name);

  return (
    <div>
      <h1>Welcome {userName} :)</h1>
    </div>
  );
};

export default HomePage;
