import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string[];
  imagePosition?: 'left' | 'right';
}

const Step = ({ icon, title, description, imagePosition = 'right' }: StepProps) => {
  return (
    <div 
      className={`flex flex-col md:flex-row items-center gap-12 ${
        imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <div className="flex-1 space-y-6">
        <div className="inline-block p-4 bg-cream-dark rounded-2xl">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-charcoal">{title}</h2>
        <ul className="space-y-4">
          {description.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span className="text-charcoal-light">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <img 
          src="https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
          alt={`Step illustration: ${title}`}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Step;