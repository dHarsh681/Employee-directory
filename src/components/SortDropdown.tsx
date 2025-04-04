'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type SortField = 'Employee Name' | 'Department' | 'Designation';
export type SortOrder = 'asc' | 'desc';

interface SortDropdownProps {
  onSortChange: (field: SortField, order: SortOrder) => void;
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<SortField>('Employee Name');
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField, order: SortOrder) => {
    setSelectedField(field);
    setSelectedOrder(order);
    onSortChange(field, order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
      >
        Sort by: {selectedField}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {(['Employee Name', 'Department', 'Designation'] as SortField[]).map((field) => (
              <div key={field} className="px-4 py-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{field}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSort(field, 'asc')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedField === field && selectedOrder === 'asc'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    Ascending
                  </button>
                  <button
                    onClick={() => handleSort(field, 'desc')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedField === field && selectedOrder === 'desc'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    Descending
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 