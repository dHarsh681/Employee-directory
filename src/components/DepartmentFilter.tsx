'use client';

import { useState, useEffect } from 'react';

interface DepartmentFilterProps {
  departments: string[];
  onFilterChange: (department: string) => void;
}

export default function DepartmentFilter({ departments, onFilterChange }: DepartmentFilterProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    onFilterChange(value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Department
      </label>
      <select
        id="department-filter"
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
        value={selectedDepartment}
        onChange={handleChange}
      >
        <option value="all">All Departments</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
} 