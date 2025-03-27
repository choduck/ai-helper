import React from 'react';
import { useRouter } from 'next/router';

const FeatureCard = ({ feature }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/features/${feature.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex items-center mb-2">
        {feature.icon && (
          <div className="mr-3">
            {feature.icon}
          </div>
        )}
        <h3 className="text-md font-medium">{feature.title}</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
      
      {feature.tags && (
        <div className="flex flex-wrap mt-2">
          {feature.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-1 mb-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;