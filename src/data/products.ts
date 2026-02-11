export type Product = {
  id: string;
  category: string;
  image: string;
  title: string;
  name?: string;
  price: string;
  description?: string;
};

export const products: Product[] = [
  { id: 's1', category: 'Smocks', image: '/images/smocks/1769703558021.png', title: 'Northern Royal Smock', name: 'Northern Royal Smock', price: 'GHS 450.00', description: 'Handwoven smock with traditional Northern patterns.' },
  { id: 's2', category: 'Smocks', image: '/images/smocks/1769703578230.png', title: 'Damba Festival Smock', name: 'Damba Festival Smock', price: 'GHS 480.00', description: 'Festive smock ideal for celebrations and ceremonies.' },
  { id: 's3', category: 'Smocks', image: '/images/smocks/1769703719112.png', title: 'Classic Striped Smock', name: 'Classic Striped Smock', price: 'GHS 420.00', description: 'Timeless striped smock for everyday elegance.' },
  { id: 's4', category: 'Smocks', image: '/images/smocks/1769705907292.png', title: 'Gonja Traditional Smock', name: 'Gonja Traditional Smock', price: 'GHS 500.00', description: 'Authentic Gonja design crafted by master weavers.' },
  { id: 's5', category: 'Smocks', image: '/images/smocks/1769705999977.png', title: 'Chief’s Ceremonial Smock', name: 'Chief’s Ceremonial Smock', price: 'GHS 600.00', description: 'Premium smock reserved for special occasions.' },
  { id: 's6', category: 'Smocks', image: '/images/smocks/1769703558021.png', title: 'Dagbon Royal Smock', name: 'Dagbon Royal Smock', price: 'GHS 550.00', description: 'A royal masterpiece featuring intricate Dagbon weaving patterns.' },

  { id: 'k1', category: 'Kente', image: '/images/kente/1769708615030.png', title: 'Ashanti Kente Cloth', name: 'Ashanti Kente Cloth', price: 'GHS 1200.00', description: 'Classic Ashanti Kente pattern in vibrant colors.' },
  { id: 'k2', category: 'Kente', image: '/images/kente/1769708700597.png', title: 'Bonwire Kente Weave', name: 'Bonwire Kente Weave', price: 'GHS 1100.00', description: 'Expertly woven Kente from Bonwire artisans.' },
  { id: 'k3', category: 'Kente', image: '/images/kente/1769708751488.png', title: 'Gold Thread Kente', name: 'Gold Thread Kente', price: 'GHS 1500.00', description: 'Luxurious Kente featuring gold-thread accents.' },
  { id: 'k4', category: 'Kente', image: '/images/kente/1769708810411.png', title: 'Royal Blue Kente', name: 'Royal Blue Kente', price: 'GHS 1300.00', description: 'Deep blue Kente with royal patterning.' },
  { id: 'k5', category: 'Kente', image: '/images/kente/1769709178890.png', title: 'Festive Kente Wrap', name: 'Festive Kente Wrap', price: 'GHS 1250.00', description: 'Bright Kente wrap perfect for celebrations.' },
  { id: 'k6', category: 'Kente', image: '/images/kente/1769708615030.png', title: 'Prestige Kente Stole', name: 'Prestige Kente Stole', price: 'GHS 900.00', description: 'Elegant Kente stole suitable for graduations and formal events.' },

  { id: 'g1', category: 'Gele', image: '/images/gele/1769710966947.png', title: 'Bridal Gele Headtie', name: 'Bridal Gele Headtie', price: 'GHS 250.00', description: 'Elegant gele for bridal ceremonies.' },
  { id: 'g2', category: 'Gele', image: '/images/gele/1769711029334.png', title: 'Sequined Gele', name: 'Sequined Gele', price: 'GHS 300.00', description: 'Sparkling sequined gele to stand out.' },
  { id: 'g3', category: 'Gele', image: '/images/gele/1769711101207.png', title: 'Rose Gold Gele', name: 'Rose Gold Gele', price: 'GHS 280.00', description: 'Rose gold tones for refined style.' },
  { id: 'g4', category: 'Gele', image: '/images/gele/1769711559678.png', title: 'Infinity Pleat Gele', name: 'Infinity Pleat Gele', price: 'GHS 350.00', description: 'Intricate infinity pleat craftsmanship.' },
  { id: 'g5', category: 'Gele', image: '/images/gele/1769712435308.png', title: 'Emerald Green Gele', name: 'Emerald Green Gele', price: 'GHS 270.00', description: 'Bold emerald hue with silky finish.' },
  { id: 'g6', category: 'Gele', image: '/images/gele/1769710966947.png', title: 'Royal Purple Gele', name: 'Royal Purple Gele', price: 'GHS 290.00', description: 'Majestic purple gele that commands attention.' },

  { id: 'b1', category: 'Beads', image: '/images/beads/1769706720261.png', title: 'Traditional Waist Beads', name: 'Traditional Waist Beads', price: 'GHS 80.00', description: 'Classic waist beads with heritage patterns.' },
  { id: 'b2', category: 'Beads', image: '/images/beads/1769706843864.png', title: 'Krobo Powder Glass Beads', name: 'Krobo Powder Glass Beads', price: 'GHS 120.00', description: 'Authentic Krobo powder glass artistry.' },
  { id: 'b3', category: 'Beads', image: '/images/beads/1769707819969.png', title: 'Akan Gold Weights', name: 'Akan Gold Weights', price: 'GHS 150.00', description: 'Beads inspired by Akan gold weight designs.' },
  { id: 'b4', category: 'Beads', image: '/images/beads/1769787601101.png', title: 'Ceremonial Neck Beads', name: 'Ceremonial Neck Beads', price: 'GHS 200.00', description: 'Handcrafted beads for ceremonies.' },
  { id: 'b5', category: 'Beads', image: '/images/beads/1769787847704.png', title: 'Colorful Trade Beads', name: 'Colorful Trade Beads', price: 'GHS 100.00', description: 'Vivid trade beads with rich history.' },
  { id: 'b6', category: 'Beads', image: '/images/beads/1769706720261.png', title: 'Bridal Bead Set', name: 'Bridal Bead Set', price: 'GHS 300.00', description: 'Complete traditional bead set for brides.' },

  { id: 'sa1', category: 'Sandals', image: '/images/sandals/1769706162269.png', title: 'Leather Ahenema', name: 'Leather Ahenema', price: 'GHS 180.00', description: 'Traditional leather Ahenema sandals.' },
  { id: 'sa2', category: 'Sandals', image: '/images/sandals/1769706283571.png', title: 'Royal Chief Sandals', name: 'Royal Chief Sandals', price: 'GHS 250.00', description: 'Premium sandals with royal accents.' },
  { id: 'sa3', category: 'Sandals', image: '/images/sandals/1769786821068.png', title: 'Crafted Leather Slides', name: 'Crafted Leather Slides', price: 'GHS 150.00', description: 'Comfortable slides crafted from fine leather.' },
  { id: 'sa4', category: 'Sandals', image: '/images/sandals/1769786925946.png', title: 'Beaded Sandals', name: 'Beaded Sandals', price: 'GHS 120.00', description: 'Decorative beaded sandals for flair.' },
  { id: 'sa5', category: 'Sandals', image: '/images/sandals/download (7).jpg', title: 'Modern African Sandals', name: 'Modern African Sandals', price: 'GHS 140.00', description: 'Contemporary sandals with African design.' },
  { id: 'sa6', category: 'Sandals', image: '/images/sandals/1769706162269.png', title: 'Classic Durbar Sandals', name: 'Classic Durbar Sandals', price: 'GHS 200.00', description: 'Durable and stylish sandals perfect for festivals.' },
];
 
 export const categories = ['Smocks', 'Kente', 'Gele', 'Beads', 'Sandals'];
