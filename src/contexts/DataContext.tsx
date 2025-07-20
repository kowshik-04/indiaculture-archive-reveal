import React, { createContext, useContext, useState, useEffect } from 'react';
import { CultureDatabase, CultureItem, ItemType, FormData, MediaFile } from '../types/CultureData';
import { generateId } from '../utils/helpers';

interface DataContextType {
  database: CultureDatabase;
  addItem: (type: ItemType, formData: FormData) => Promise<void>;
  getItemsByType: (type: ItemType) => CultureItem[];
  getItemById: (id: string) => CultureItem | undefined;
  getAllItems: () => CultureItem[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data for demonstration
const sampleData: CultureDatabase = {
  temples: [
    {
      id: 'temple-1',
      type: 'temple',
      name: 'Brihadeeswara Temple',
      place: 'Thanjavur, Tamil Nadu',
      description: 'The Brihadeeswara Temple, also called Rajarajeswaram or Peruvudaiyar Kovil, is a Hindu temple dedicated to Shiva located in Thanjavur, Tamil Nadu. Built between 1003 and 1010 AD by the Chola emperor Rajaraja I, this temple is one of the largest South Indian temples and an exemplary example of a fully realized Dravidian architecture. It is part of the UNESCO World Heritage Site known as the "Great Living Chola Temples". The temple is renowned for its massive size and architectural grandeur. The main temple tower (vimana) is 216 feet tall and was the tallest structure in the world at the time of its construction. The temple complex houses many halls, shrines and other structures built over various periods. The temple has a massive courtyard and is surrounded by a fortified wall.',
      deity: 'Lord Shiva (Brihadeeswara)',
      age: '1010 AD (Over 1000 years old)',
      images: [
        {
          id: 'img-1',
          name: 'brihadeeswara-main.jpg',
          url: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800',
          type: 'image',
          size: 1200000
        },
        {
          id: 'img-2',
          name: 'brihadeeswara-tower.jpg',
          url: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800',
          type: 'image',
          size: 1100000
        },
        {
          id: 'img-3',
          name: 'brihadeeswara-hall.jpg',
          url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800',
          type: 'image',
          size: 950000
        }
      ],
      videos: [
        {
          id: 'vid-1',
          name: 'temple-tour.mp4',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          type: 'video',
          size: 50000000
        }
      ],
      coordinates: {
        lat: 10.7828,
        lng: 79.1317
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ],
  festivals: [
    {
      id: 'festival-1',
      type: 'festival',
      name: 'Diwali - Festival of Lights',
      place: 'Across India',
      description: 'Diwali, also known as Deepavali, is one of the most significant festivals in Hindu culture, celebrated across India and by Hindu communities worldwide. Known as the Festival of Lights, Diwali symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance. The festival typically lasts five days, with the main celebration occurring on the new moon night in the month of Kartik (October or November). During Diwali, homes and streets are illuminated with diyas (oil lamps), candles, and colorful lights. Families clean and decorate their homes, create beautiful rangoli patterns, exchange gifts and sweets, and burst fireworks. The festival has deep spiritual significance, commemorating Lord Rama\'s return to Ayodhya after defeating Ravana, and Goddess Lakshmi\'s emergence from the ocean during the churning of the cosmic ocean.',
      date: 'October/November (New Moon in Kartik month)',
      history: 'Ancient festival with references in Sanskrit texts dating back 2500 years',
      images: [
        {
          id: 'img-4',
          name: 'diwali-lights.jpg',
          url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800',
          type: 'image',
          size: 1300000
        },
        {
          id: 'img-5',
          name: 'diwali-rangoli.jpg',
          url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800',
          type: 'image',
          size: 1150000
        },
        {
          id: 'img-6',
          name: 'diwali-celebration.jpg',
          url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800',
          type: 'image',
          size: 1250000
        }
      ],
      videos: [
        {
          id: 'vid-2',
          name: 'diwali-celebration.mp4',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          type: 'video',
          size: 45000000
        }
      ],
      coordinates: {
        lat: 20.5937,
        lng: 78.9629
      },
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ],
  food: [
    {
      id: 'food-1',
      type: 'food',
      name: 'Hyderabadi Biryani',
      place: 'Hyderabad, Telangana',
      description: 'Hyderabadi Biryani is a world-renowned aromatic rice dish that originated in the kitchens of the Nizams of Hyderabad. This iconic dish represents the perfect fusion of Mughlai and Telugu cuisines, creating a unique culinary masterpiece that has won hearts across the globe. The biryani is prepared using the traditional dum cooking method, where partially cooked rice and marinated meat (usually mutton or chicken) are layered together and slow-cooked in a sealed pot. The magic lies in the precise blend of spices including cardamom, cinnamon, bay leaves, star anise, and saffron, which infuse the dish with an incredible aroma and complex flavors. What sets Hyderabadi Biryani apart is its subtle balance of spices, the use of high-quality Basmati rice, and the meticulous cooking technique that ensures each grain remains separate while absorbing the rich flavors of the meat and spices.',
      taste: 'Aromatic, mildly spiced with complex flavors, rich and indulgent',
      images: [
        {
          id: 'img-7',
          name: 'biryani-plate.jpg',
          url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800',
          type: 'image',
          size: 1000000
        },
        {
          id: 'img-8',
          name: 'biryani-cooking.jpg',
          url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
          type: 'image',
          size: 1100000
        },
        {
          id: 'img-9',
          name: 'biryani-ingredients.jpg',
          url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800',
          type: 'image',
          size: 950000
        }
      ],
      videos: [
        {
          id: 'vid-3',
          name: 'biryani-making.mp4',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          type: 'video',
          size: 40000000
        }
      ],
      coordinates: {
        lat: 17.3850,
        lng: 78.4867
      },
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  ],
  clothes: [
    {
      id: 'cloth-1',
      type: 'cloth',
      name: 'Kanjeevaram Silk Saree',
      place: 'Kanchipuram, Tamil Nadu',
      description: 'Kanjeevaram silk sarees, also known as Kanchipuram sarees, are among the finest silk sarees in India, originating from the temple town of Kanchipuram in Tamil Nadu. These sarees are considered the epitome of South Indian silk weaving and are often called the "Queen of Silks." The tradition of weaving these exquisite sarees dates back over 400 years and is deeply rooted in the cultural and religious heritage of the region. Kanjeevaram sarees are characterized by their lustrous silk, vibrant colors, intricate gold zari work, and traditional motifs inspired by temple architecture, mythology, and nature. The weaving process is incredibly complex and time-consuming, with a single saree taking anywhere from 10 days to several months to complete, depending on the intricacy of the design. The silk used is of the highest quality, sourced from pure mulberry silk, and the zari is made from pure gold and silver threads.',
      clothType: 'Traditional Silk Saree',
      images: [
        {
          id: 'img-10',
          name: 'kanjeevaram-saree.jpg',
          url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800',
          type: 'image',
          size: 1200000
        },
        {
          id: 'img-11',
          name: 'saree-weaving.jpg',
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
          type: 'image',
          size: 1050000
        },
        {
          id: 'img-12',
          name: 'saree-detail.jpg',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
          type: 'image',
          size: 980000
        }
      ],
      videos: [
        {
          id: 'vid-4',
          name: 'saree-weaving-process.mp4',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          type: 'video',
          size: 35000000
        }
      ],
      coordinates: {
        lat: 12.8184,
        lng: 79.7036
      },
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    }
  ],
  villages: [
    {
      id: 'village-1',
      type: 'village',
      name: 'Khimsar Village',
      place: 'Nagaur District, Rajasthan',
      description: 'Khimsar is a historic village in the Nagaur district of Rajasthan, renowned for its magnificent 16th-century fort and traditional Rajasthani architecture. This picturesque village offers a glimpse into the royal heritage of Rajasthan, with its imposing fort palace that has been converted into a heritage hotel while maintaining its authentic character. The village is surrounded by the golden sand dunes of the Thar Desert, creating a mesmerizing landscape that changes colors throughout the day. Khimsar Fort, built in 1523 AD, stands as a testament to Rajput architecture and engineering prowess. The village is also famous for its traditional crafts, including pottery, textile weaving, and camel leather products. The local community has preserved age-old traditions of folk music, dance, and storytelling that date back centuries. Visitors can experience authentic Rajasthani culture through village walks, camel safaris, and traditional performances.',
      state: 'Rajasthan',
      specialty: 'Historic fort, desert tourism, traditional crafts, and royal heritage',
      images: [
        {
          id: 'img-13',
          name: 'khimsar-fort.jpg',
          url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800',
          type: 'image',
          size: 1300000
        },
        {
          id: 'img-14',
          name: 'desert-landscape.jpg',
          url: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800',
          type: 'image',
          size: 1150000
        },
        {
          id: 'img-15',
          name: 'village-life.jpg',
          url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800',
          type: 'image',
          size: 1050000
        }
      ],
      videos: [
        {
          id: 'vid-5',
          name: 'village-tour.mp4',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          type: 'video',
          size: 42000000
        }
      ],
      coordinates: {
        lat: 27.0333,
        lng: 72.4167
      },
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    }
  ]
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [database, setDatabase] = useState<CultureDatabase>(sampleData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedData = localStorage.getItem('culture-database');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setDatabase(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever database changes
    localStorage.setItem('culture-database', JSON.stringify(database));
  }, [database]);

  const addItem = async (type: ItemType, formData: FormData): Promise<void> => {
    setIsLoading(true);
    try {
      // Process uploaded files
      const processedImages: MediaFile[] = await Promise.all(
        formData.images.map(async (file) => ({
          id: generateId(),
          name: file.name,
          url: URL.createObjectURL(file),
          type: 'image' as const,
          size: file.size
        }))
      );

      const processedVideos: MediaFile[] = await Promise.all(
        formData.videos.map(async (file) => ({
          id: generateId(),
          name: file.name,
          url: URL.createObjectURL(file),
          type: 'video' as const,
          size: file.size
        }))
      );

      const baseItem = {
        id: generateId(),
        name: formData.name,
        place: formData.place,
        description: formData.description,
        images: processedImages,
        videos: processedVideos,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      let newItem: CultureItem;

      switch (type) {
        case 'temple':
          newItem = {
            ...baseItem,
            type: 'temple',
            deity: formData.deity || '',
            age: formData.age || ''
          };
          break;
        case 'festival':
          newItem = {
            ...baseItem,
            type: 'festival',
            date: formData.date || '',
            history: formData.history || ''
          };
          break;
        case 'food':
          newItem = {
            ...baseItem,
            type: 'food',
            taste: formData.taste || ''
          };
          break;
        case 'cloth':
          newItem = {
            ...baseItem,
            type: 'cloth',
            clothType: formData.clothType || ''
          };
          break;
        case 'village':
          newItem = {
            ...baseItem,
            type: 'village',
            state: formData.state || '',
            specialty: formData.specialty || ''
          };
          break;
        default:
          throw new Error(`Unknown item type: ${type}`);
      }

      let key: keyof CultureDatabase;
      switch (type) {
        case 'cloth':
          key = 'clothes';
          break;
        case 'food':
          key = 'food';
          break;
        default:
          key = `${type}s` as keyof CultureDatabase;
      }

      setDatabase(prev => ({
        ...prev,
        [key]: [
          ...prev[key],
          newItem
        ]
      }));
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getItemsByType = (type: ItemType): CultureItem[] => {
    let key: keyof CultureDatabase;
    switch (type) {
      case 'cloth':
        key = 'clothes';
        break;
      case 'food':
        key = 'food';
        break;
      default:
        key = `${type}s` as keyof CultureDatabase;
    }
    return database[key] || [];
  };

  const getItemById = (id: string): CultureItem | undefined => {
    const allItems = getAllItems();
    return allItems.find(item => item.id === id);
  };

  const getAllItems = (): CultureItem[] => {
    return [
      ...database.temples,
      ...database.festivals,
      ...database.food,
      ...database.clothes,
      ...database.villages
    ];
  };

  return (
    <DataContext.Provider value={{
      database,
      addItem,
      getItemsByType,
      getItemById,
      getAllItems,
      isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};