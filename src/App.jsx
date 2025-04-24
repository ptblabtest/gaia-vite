import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";

function App() {
  return (
    <main>
        <Toaster richColors position="top-center" />
      <Outlet />
    </main>
  );
}

export default App;