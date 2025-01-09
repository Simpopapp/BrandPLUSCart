import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface PremiumSection2Props {
  onButtonClick?: () => void;
}

export function PremiumSection2({ onButtonClick }: PremiumSection2Props) {
  return (
    <div className="relative overflow-hidden bg-secondary rounded-lg p-8 mb-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gold flex items-center gap-2">
            <Star className="h-8 w-8" /> Ignite V80
          </h2>
          <p className="text-gray-400 mb-6">
            Descubra nossa linha premium V80, com design elegante e duração excepcional de até 800 puffs.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>800 puffs de duração</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Design compacto</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Sabores intensos</span>
            </div>
          </div>
          <Button 
            className="mt-8 bg-gradient-gold text-black hover:bg-gold hover:scale-105 transition-all duration-300"
            onClick={onButtonClick}
          >
            Comprar V80
          </Button>
        </div>
        <div className="flex-1">
          <img
            src="https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859"
            alt="Ignite V80"
            className="rounded-lg w-full h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}