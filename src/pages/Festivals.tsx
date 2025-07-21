import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Camera } from "lucide-react";
import ItemDetailModal from "@/components/ItemDetailModal";
import type { CultureItem } from "@/types/CultureData";

const Festivals = () => {
  const { getItemsByType } = useData();
  const { t } = useLanguage();
  const festivals = getItemsByType('festival');
  const [selectedItem, setSelectedItem] = useState<CultureItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (festival: CultureItem) => {
    setSelectedItem(festival);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/5 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-4">
            {t('festivals')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the vibrant celebrations and cultural traditions of India's festivals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {festivals.map((festival) => (
            <Card 
              key={festival.id} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-secondary/20 cursor-pointer"
              onClick={() => handleItemClick(festival)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img
                    src={festival.images[0]?.url}
                    alt={festival.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {festival.place}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 text-foreground">{festival.name}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                  {festival.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {'date' in festival && festival.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {festival.images.length}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {festivals.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No festivals added yet. Be the first to add one!</p>
          </div>
        )}
      </div>

      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Festivals;