import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[80vh] bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Celebrating India's Heritage</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-6 animate-scale-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {t('hero.title').split(' ').slice(0, 3).join(' ')}
            </span>
            <br />
            <span className="text-foreground">
              {t('hero.title').split(' ').slice(3).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/temples">
              <Button size="lg" className="bg-gradient-primary hover:shadow-hover transition-all duration-300 text-lg px-8 py-4 group">
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-secondary/80 transition-all duration-300">
                Explore Map
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 hidden lg:block animate-float">
          <div className="w-16 h-16 bg-temple-gold/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-temple-gold/30">
            <span className="text-2xl">🏛️</span>
          </div>
        </div>
        
        <div className="absolute top-1/3 right-10 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 bg-festival-red/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-festival-red/30">
            <span className="text-2xl">🎭</span>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 bg-food-orange/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-food-orange/30">
            <span className="text-2xl">🍛</span>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/4 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-16 h-16 bg-cloth-purple/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cloth-purple/30">
            <span className="text-2xl">👘</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;