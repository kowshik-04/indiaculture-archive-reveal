import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Building2, Calendar, UtensilsCrossed, Shirt, MapPin, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  link: string;
  gradient: string;
  count: number;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  link, 
  gradient, 
  count, 
  image 
}) => {
  return (
    <div className="group relative bg-gradient-card backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 animate-scale-in">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-overlay ${gradient}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
              {count} items
            </div>
          </div>

          <h3 className="text-xl font-playfair font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            {description}
          </p>
        </div>

        <Link to={link} className="w-full">
          <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white hover:text-white group-hover:scale-105 transition-all duration-300">
            Explore
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const CategoryCards: React.FC = () => {
  const { t } = useLanguage();
  const { getItemsByType } = useData();

  const categories = [
    {
      title: t('categories.temples'),
      description: 'Discover ancient temples and their rich spiritual heritage across India',
      icon: Building2,
      link: '/temples',
      gradient: 'bg-gradient-to-br from-temple-gold/80 to-temple-gold/60',
      count: getItemsByType('temple').length,
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800'
    },
    {
      title: t('categories.festivals'),
      description: 'Experience the vibrant colors and traditions of Indian festivals',
      icon: Calendar,
      link: '/festivals',
      gradient: 'bg-gradient-to-br from-festival-red/80 to-festival-red/60',
      count: getItemsByType('festival').length,
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800'
    },
    {
      title: t('categories.food'),
      description: 'Savor the diverse flavors and culinary traditions of India',
      icon: UtensilsCrossed,
      link: '/food',
      gradient: 'bg-gradient-to-br from-food-orange/80 to-food-orange/60',
      count: getItemsByType('food').length,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800'
    },
    {
      title: t('categories.clothes'),
      description: 'Explore traditional attire and textile heritage of different regions',
      icon: Shirt,
      link: '/clothes',
      gradient: 'bg-gradient-to-br from-cloth-purple/80 to-cloth-purple/60',
      count: getItemsByType('cloth').length,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'
    },
    {
      title: t('categories.villages'),
      description: 'Journey through historic villages and their unique cultural stories',
      icon: MapPin,
      link: '/villages',
      gradient: 'bg-gradient-to-br from-village-green/80 to-village-green/60',
      count: getItemsByType('village').length,
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Explore Our <span className="bg-gradient-primary bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dive deep into the rich tapestry of Indian culture through our carefully curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((category, index) => (
            <div key={category.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {categories.slice(3).map((category, index) => (
            <div key={category.title} className="animate-scale-in" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;