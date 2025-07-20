import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { DataProvider } from "./contexts/DataContext";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Temples from "./pages/Temples";
import Festivals from "./pages/Festivals";
import Food from "./pages/Food";
import Clothes from "./pages/Clothes";
import Villages from "./pages/Villages";
import Add from "./pages/Add";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background font-inter">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/temples" element={<Temples />} />
                  <Route path="/festivals" element={<Festivals />} />
                  <Route path="/food" element={<Food />} />
                  <Route path="/clothes" element={<Clothes />} />
                  <Route path="/villages" element={<Villages />} />
                  <Route path="/add" element={<Add />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
