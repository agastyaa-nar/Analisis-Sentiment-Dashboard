import { NavLink } from "./NavLink";
import { BarChart3, Home, MessageSquare, TrendingUp, FileText, Sparkles } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-glow">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SIREKAP Analytics</span>
          </div>
          
          <div className="hidden md:flex gap-1">
            <NavLink
              to="/"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              activeClassName="bg-gradient-warm text-white shadow-soft"
            >
              <Home className="w-4 h-4 inline mr-2" />
              Beranda
            </NavLink>
            <NavLink
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              activeClassName="bg-gradient-warm text-white shadow-soft"
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Dashboard
            </NavLink>
            <NavLink
              to="/wordcloud"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              activeClassName="bg-gradient-warm text-white shadow-soft"
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Word Cloud
            </NavLink>
            <NavLink
              to="/insights"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              activeClassName="bg-gradient-warm text-white shadow-soft"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Insights
            </NavLink>
            <NavLink
              to="/predict"
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              activeClassName="bg-gradient-warm text-white shadow-soft"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Prediksi
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
