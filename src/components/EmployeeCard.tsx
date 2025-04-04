import { Employee } from '@/data/employees';
import { Phone, Mail, Building, Briefcase, User } from 'lucide-react';
import { useState } from 'react';

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${employee["Phone"]}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${employee["Email"]}`;
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ${
        isHovered ? 'shadow-lg transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full p-3 mr-4">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{employee["Employee Name"]}</h2>
            <p className="text-gray-600 dark:text-gray-300">{employee["Designation"]}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCall}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
            title="Call Employee"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={handleEmail}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
            title="Email Employee"
          >
            <Mail size={18} />
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Building className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
          <span className="font-medium">Department:</span>
          <span className="ml-2">{employee["Department"]}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
          <span className="font-medium">Contact:</span>
          <span className="ml-2">{employee["Phone"]}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
          <span className="font-medium">Email:</span>
          <span className="ml-2">{employee["Email"]}</span>
        </div>
      </div>
    </div>
  );
} 