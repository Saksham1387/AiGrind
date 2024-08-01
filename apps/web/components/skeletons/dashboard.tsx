// SkeletonHero.jsx
export function SkeletonHero() {
    return (
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-row">

              <div className="flex flex-row gap-[200px] flex-2">
                <div className="w-full bg-lightgray animate-pulse">
            <SkeletonCard></SkeletonCard>
            <div className="ml-[300px] w-full bg-lightgray  animate-pulse">
            <SkeletonCard></SkeletonCard>
            </div>

                </div>
                <div className="ml-[150px] bg-lightgray animate-pulse">
                <SkeletonCalendar></SkeletonCalendar>

                </div>  

              </div>
              
            </div>
          </div>
        </div>
      </section>
    );
  }


 function SkeletonCard() {
    return (
      <div className="px-[100px] bg-lightgray ml-20 ">
  
      {/* Content Section */}
      
    </div>
    );
  }

  import { ChevronLeft, ChevronRight } from "lucide-react";

function SkeletonCalendar() {
  return (
    <div className="p-6 bg-lightgray  rounded-lg">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-4">
        <ChevronLeft className="h-6 w-6 text-gray-500 animate-pulse" />
        <ChevronRight className="h-6 w-6 text-gray-500 animate-pulse" />
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-col space-y-6">
        {/* Header Row */}
        <div className="flex space-x-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="w-12 h-12 bg-lightgray text-gray-400 rounded-md flex items-center justify-center animate-pulse"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {[...Array(7)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-12 h-12 bg-darkgray text-gray-400 rounded-md flex items-center justify-center animate-pulse"
              >
                {/* Simulate day numbers */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
  
  // SkeletonDashboardProblems.jsx
  export function SkeletonDashboardProblems() {
    return (
      <div className="bg-gray-200 p-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 bg-gray-300 animate-pulse"></th>
              <th className="p-2 bg-gray-300 animate-pulse"></th>
              <th className="p-2 bg-gray-300 animate-pulse"></th>
              <th className="p-2 bg-gray-300 animate-pulse"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="p-2 bg-gray-100 animate-pulse"></td>
                <td className="p-2 bg-gray-100 animate-pulse"></td>
                <td className="p-2 bg-gray-100 animate-pulse"></td>
                <td className="p-2 bg-gray-100 animate-pulse"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }