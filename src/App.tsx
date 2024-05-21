import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import OnboardPage from "./pages/onboard";
import FeedsPage from "./pages/feeds";
import CreatePostPage from "./pages/create-post";
import { AppProvider } from "./app-context";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" Component={OnboardPage} />
          <Route path="/feeds" Component={FeedsPage} />
          <Route path="/create-post" Component={CreatePostPage} />
        </Routes>
        <Toaster
          position="top-center"
          visibleToasts={3}
          duration={5000}
          richColors
          toastOptions={{
            style: {
              padding: "1rem",
            },
          }}
        />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
