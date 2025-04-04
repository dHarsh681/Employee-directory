'use client';

import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortField = 'Employee Name' | 'Department' | 'Designation';
export type SortOrder = 'asc' | 'desc';

interface SortDropdownProps {
  onSortChange: (field: SortField, order: SortOrder) => void;
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
  const [sortField, setSortField] = useState<SortField>('Employee Name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value as SortField;
    setSortField(field);
    onSortChange(field, sortOrder);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as SortOrder;
    setSortOrder(order);
    onSortChange(sortField, order);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <ArrowUpDown className="h-4 w-4 text-gray-500 mr-2" />
        <label htmlFor="sort-field" className="text-sm font-medium text-gray-700 mr-2">
          Sort by:
        </label>
        <select
          id="sort-field"
          className="block pl-3 pr-10 py-1 text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          value={sortField}
          onChange={handleFieldChange}
        >
          <option value="Employee Name">Name</option>
          <option value="Department">Department</option>
          <option value="Designation">Designation</option>
        </select>
      </div>
      <select
        id="sort-order"
        className="block pl-3 pr-10 py-1 text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
        value={sortOrder}
        onChange={handleOrderChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
} 