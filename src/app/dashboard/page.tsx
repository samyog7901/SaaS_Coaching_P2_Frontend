

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";

// const Dashboard = () => {
//   const router = useRouter();

//   const { user } = useAppSelector((state) => state.auth);
//   const [activeTab, setActiveTab] = useState("courses");
//   const [isInstitute, setIsInstitute] = useState(false);
//   const {institute} = useAppSelector((state)=>state.institute)
  
//   useEffect(() => {
//     const checkInstituteStatus = () => {
//       setIsInstitute(false);
//       console.log("Checking institute status for user:", user?.id);
//       console.log("LocalStorage institute status:", localStorage.getItem(`institute_${user?.id}`));
      
//       // 1. Check user-specific localStorage
//       if (user?.id) {
//         const userInstituteStatus = localStorage.getItem(`institute_${user.id}`);
//         if (userInstituteStatus === 'true') {
//           setIsInstitute(true);
//           return;
//         }
//       }
      
   
//       if (user?.id && institute?.userId === user.id) {
//         console.log("User is an institute (from Redux institute data)");
//         setIsInstitute(true);
//       } else if (user?.instituteId) {
//         console.log("User is an institute (from user instituteId)");
//         setIsInstitute(true);
//       } else if (user?.role === 'institute') {
//         console.log("User is an institute (from user role)");
//         setIsInstitute(true);
//       } else {
//         console.log("User is NOT an institute");
//         setIsInstitute(false);
//       }
//     };

//     checkInstituteStatus();

//       // Clean up any general institute flags that might cause issues
//       if (user?.id) {
//         const generalFlag = localStorage.getItem('isInstitute');
//         if (generalFlag === 'true') {
//           console.log("Cleaning up general institute flag");
//           localStorage.removeItem('isInstitute');
//         }
//       }
  
//     // Listen for storage events (when localStorage changes from other tabs)
//     const handleStorageChange = (e : StorageEvent) => {
//         if (e.key === `institute_${user?.id}` || e.key === 'isInstitute') {
            
//             checkInstituteStatus();
//         }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [user, institute]);

//   useEffect(() => {
//     if (isInstitute && activeTab === "become-institute") {
//       setActiveTab("institute-dashboard");
//     }
//   }, [isInstitute, activeTab]);




//   // Sample courses data
//   const courses = [
//     { id: 1, title: "Web Development", price: "$49", instructor: "John Doe" },
//     { id: 2, title: "Data Science", price: "$59", instructor: "Jane Smith" },
//     { id: 3, title: "UI/UX Design", price: "$39", instructor: "Mike Johnson" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
 

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Navigation Tabs */}
//         <div className="bg-white rounded-lg shadow mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button
//                 onClick={() => setActiveTab("courses")}
//                 className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                   activeTab === "courses"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 Browse Courses
//               </button>
              
//               {!isInstitute && (
//                 <button
//                   onClick={() => setActiveTab("become-institute")}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                     activeTab === "become-institute"
//                       ? "border-blue-500 text-blue-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 >
//                   Become an Institute
//                 </button>
//               )}
              
//               <button
//                 onClick={() => setActiveTab("join-institute")}
//                 className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                   activeTab === "join-institute"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 Join Institute
//               </button>
              
//               <button
//                 onClick={() => setActiveTab("profile")}
//                 className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                   activeTab === "profile"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 Profile
//               </button>
              
//               {isInstitute && (
//                 <button
//                   onClick={() => setActiveTab("institute-dashboard")}
//                   className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
//                     activeTab === "institute-dashboard"
//                       ? "border-blue-500 text-blue-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 >
//                   Institute Dashboard
//                 </button>
//               )}
//             </nav>
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="bg-white rounded-lg shadow p-6">
//           {activeTab === "courses" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {courses.map((course) => (
//                   <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                     <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
//                     <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
//                     <p className="text-blue-600 font-bold mb-4">{course.price}</p>
//                     <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
//                       Enroll Now
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "become-institute" && !isInstitute && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Become an Institute</h2>
//               <div className="bg-blue-50 p-6 rounded-lg mb-6">
//                 <h3 className="font-semibold text-lg mb-4">Benefits of becoming an institute:</h3>
//                 <ul className="list-disc list-inside space-y-2">
//                   <li>Create and sell your own courses</li>
//                   <li>Manage multiple instructors</li>
//                   <li>Track student progress and analytics</li>
//                   <li>Earn revenue from course sales</li>
//                 </ul>
//               </div>
//               <button 
//                 onClick={() => router.push("/institute/become")}
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold"
//               >
//                 Register Your Institute
//               </button>
//             </div>
//           )}

//           {activeTab === "join-institute" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Join an Institute</h2>
//               <div className="mb-6">
//                 <input
//                   type="text"
//                   placeholder="Enter institute code"
//                   className="border rounded-lg px-4 py-2 w-full max-w-md"
//                 />
//               </div>
//               <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
//                 Join Institute
//               </button>
//             </div>
//           )}

//           {activeTab === "profile" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-4">Personal Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Username</label>
//                       <p className="mt-1">{user?.username}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Email</label>
//                       <p className="mt-1">{user?.email || "Not provided"}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-4">Account Type</h3>
//                   <p className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block">
//                     {isInstitute ? "Institute Account" : "Student Account"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "institute-dashboard" && isInstitute && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Institute Dashboard</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-lg mb-2">Total Courses</h3>
//                   <p className="text-3xl font-bold">12</p>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-lg mb-2">Total Students</h3>
//                   <p className="text-3xl font-bold">345</p>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded-lg">
//                   <h3 className="font-semibold text-lg mb-2">Revenue</h3>
//                   <p className="text-3xl font-bold">$2,540</p>
//                 </div>
//               </div>
//               <div className="flex space-x-4">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
//                   Create New Course
//                 </button>
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
//                   Manage Courses
//                 </button>
//                 <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md">
//                   View Analytics
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;