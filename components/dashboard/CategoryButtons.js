import React from 'react';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'automation', name: '업무 자동화' },
  { id: 'document', name: '문서 처리' },
  { id: 'communication', name: '커뮤니케이션' },
  { id: 'data', name: '데이터 분석' },
  { id: 'design', name: '디자인' }
];

const CategoryButtons = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`py-2 px-4 rounded-full text-sm whitespace-nowrap ${
            activeCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;