import React from 'react';
import { Category } from '@/types';
import { MoreVertical } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete?.();
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Color accent bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: category.color }}
      />

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-semibold"
              style={{ backgroundColor: category.color }}
            >
              {category.icon || category.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {category.description}
              </p>
            </div>
          </div>

          {/* Menu button */}
          {(onEdit || onDelete) && (
            <div className="relative">
              <button
                onClick={handleMenuClick}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>

              {/* Dropdown menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  {onEdit && (
                    <button
                      onClick={handleEdit}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Item count */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {category.itemCount}
            </span>
            <span className="text-sm text-gray-500">
              {category.itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="text-xs text-gray-400">
            Click to view details
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};
