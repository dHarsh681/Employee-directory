# Employee Directory Dashboard

A modern employee directory dashboard built with Next.js and Tailwind CSS. This application allows you to view, search, and filter employee information.

## Features

- **Employee Cards**: Display employee information including name, department, designation, contact number, and email
- **Direct Calling**: Click the phone icon to call an employee directly
- **Search Functionality**: Search employees by name, department, or designation
- **Department Filtering**: Filter employees by department
- **Responsive Design**: Works on all screen sizes (mobile, tablet, desktop)
- **Loading States**: Shows loading indicators while fetching data
- **Error Handling**: Displays error messages when API requests fail

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd employee-directory
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **View Employees**: All employees are displayed in a grid layout
- **Search**: Use the search bar to find employees by name, department, or designation
- **Filter by Department**: Use the department dropdown to filter employees by department
- **Call an Employee**: Click the phone icon on an employee card to call them directly

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

## API

The application fetches employee data from the following API endpoint:
```
https://67efd7932a80b06b8895fa58.mockapi.io/api/v1/data/Test
```

## License

This project is licensed under the MIT License.
