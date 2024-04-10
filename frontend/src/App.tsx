import React from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import { Button } from "./components/ui/button";

const App = () => {
  const refresh = useRefreshToken();
  return (
    <div>
      <h1>App</h1>
      <Button onClick={refresh}>Refresh</Button>
    </div>
  );
};

export default App;
