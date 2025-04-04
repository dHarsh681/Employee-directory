'use client';

import { Employee } from '@/data/employees';

interface DepartmentStatsProps {
  employees: Employee[];
}

export default function DepartmentStats({ employees }: DepartmentStatsProps) {
  // Calculate department statistics
  const departmentStats = employees.reduce((acc, employee) => {
    const department = employee["Department"];
    if (!acc[department]) {
      acc[department] = {
        count: 0,
        totalSalary: 0,
      };
    }
    acc[department].count++;
    acc[department].totalSalary += parseFloat(employee["Salary"].replace(/[^0-9.-]+/g, ''));
    return acc;
  }, {} as Record<string, { count: number; totalSalary: number }>);

  // Calculate overall statistics
  const totalEmployees = employees.length;
  const totalSalary = Object.values(departmentStats).reduce(
    (sum, dept) => sum + dept.totalSalary,
    0
  );
  const averageSalary = totalSalary / totalEmployees;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Department Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Employees</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{totalEmployees}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Total Salary</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-300">
            ${totalSalary.toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Average Salary</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            ${averageSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Department Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(departmentStats).map(([department, stats]) => (
            <div key={department} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">{department}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Employees: {stats.count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Salary: ${stats.totalSalary.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Average: ${(stats.totalSalary / stats.count).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 