'use client';

import { Employee } from '@/data/employees';
import EmployeeCard from '@/components/EmployeeCard';
import SearchBar from '@/components/SearchBar';
import DepartmentFilter from '@/components/DepartmentFilter';
import SortDropdown, { SortField, SortOrder } from '@/components/SortDropdown';
import DepartmentStats from '@/components/DepartmentStats';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [sortField, setSortField] = useState<SortField>('Employee Name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showStats, setShowStats] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://67efd7932a80b06b8895fa58.mockapi.io/api/v1/data/Test');
        
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
        
        // Extract unique departments
        const uniqueDepartments = Array.from(new Set(data.map((emp: Employee) => emp["Department"]))) as string[];
        setDepartments(uniqueDepartments);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [searchQuery, selectedDepartment, employees]);

  useEffect(() => {
    sortEmployees();
  }, [sortField, sortOrder, filteredEmployees]);

  const filterEmployees = () => {
    let filtered = [...employees];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(employee => 
        employee["Employee Name"].toLowerCase().includes(lowercasedQuery) ||
        employee["Department"].toLowerCase().includes(lowercasedQuery) ||
        employee["Designation"].toLowerCase().includes(lowercasedQuery)
      );
    }
    
    // Apply department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(employee => 
        employee["Department"] === selectedDepartment
      );
    }
    
    setFilteredEmployees(filtered);
  };

  const sortEmployees = () => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    setFilteredEmployees(sorted);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDepartmentFilter = (department: string) => {
    setSelectedDepartment(department);
  };

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleLogout = () => {
    // Remove cookie for middleware
    document.cookie = 'isAuthenticated=false; path=/';
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading employee directory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Employee Directory</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowStats(!showStats)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              {showStats ? 'Hide Statistics' : 'Show Statistics'}
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {showStats && <DepartmentStats employees={employees} />}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SearchBar onSearch={handleSearch} />
            <DepartmentFilter departments={departments} onFilterChange={handleDepartmentFilter} />
          </div>
          
          <div className="flex justify-end">
            <SortDropdown onSortChange={handleSortChange} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </div>
        
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-300 text-lg">No employees found matching your search criteria.</p>
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>
    </main>
  );
}
