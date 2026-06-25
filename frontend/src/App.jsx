import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Chatbot from "./components/Chatbot";
import GroqChatbot from "./components/GroqChatbot";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <GroqChatbot />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
