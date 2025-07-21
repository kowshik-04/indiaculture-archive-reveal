import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shirt, Camera } from "lucide-react";
import ItemDetailModal from "@/components/ItemDetailModal";
import type { CultureItem } from "@/types/CultureData";

const Clothes = () => {
  const { getItemsByType } = useData();
  const { t } = useLanguage();
  const clothes = getItemsByType('cloth');
  const [selectedItem, setSelectedItem] = useState<CultureItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (cloth: CultureItem) => {
    setSelectedItem(cloth);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/5 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-subtle bg-clip-text text-transparent mb-4">
            {t('clothes')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the rich textile heritage and traditional attire of India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clothes.map((cloth) => (
            <Card 
              key={cloth.id} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-muted/20 cursor-pointer"
              onClick={() => handleItemClick(cloth)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img
                    src={cloth.images[0]?.url}
                    alt={cloth.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {cloth.place}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2 text-foreground">{cloth.name}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                  {cloth.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shirt className="w-4 h-4" />
                    {'clothType' in cloth && cloth.clothType}
                  </div>
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {cloth.images.length}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clothes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No traditional clothing added yet. Be the first to add one!</p>
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

export default Clothes;