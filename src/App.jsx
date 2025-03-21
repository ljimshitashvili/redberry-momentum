import { useState } from "react";
import { Navbar, Body } from "./layout";

function App() {
  const [toggleWindow, setToggleWindow] = useState(false);

  return (
    <div>
      <Navbar setToggleWindow={setToggleWindow} toggleWindow={toggleWindow} />
      <Body toggleWindow={toggleWindow} setToggleWindow={setToggleWindow} />
    </div>
  );
}

export default App;
