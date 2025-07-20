import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { 
  Home, 
  Building2, 
  Calendar, 
  UtensilsCrossed, 
  Shirt, 
  MapPin, 
  Map, 
  Plus, 
  Menu,
  X,
  Globe
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navigation: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('languages.en') },
    { code: 'hi', name: t('languages.hi') },
    { code: 'te', name: t('languages.te') },
    { code: 'ta', name: t('languages.ta') },
    { code: 'kn', name: t('languages.kn') },
    { code: 'ml', name: t('languages.ml') }
  ];

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/temples', label: t('nav.temples'), icon: Building2 },
    { path: '/festivals', label: t('nav.festivals'), icon: Calendar },
    { path: '/food', label: t('nav.food'), icon: UtensilsCrossed },
    { path: '/clothes', label: t('nav.clothes'), icon: Shirt },
    { path: '/villages', label: t('nav.villages'), icon: MapPin },
    { path: '/map', label: t('nav.map'), icon: Map }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-card backdrop-blur-lg border-b border-border/50 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-playfair font-bold text-foreground">
                भारतीय संस्कृति
              </h1>
              <p className="text-xs text-muted-foreground">Culture Archive</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-hover'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{languages.find(l => l.code === currentLanguage)?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border border-border/50 shadow-hover">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${
                      currentLanguage === lang.code ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add Content Button */}
            <Link to="/add">
              <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-200 animate-glow-pulse">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{t('nav.add')}</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="py-4 space-y-2 border-t border-border/50">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;