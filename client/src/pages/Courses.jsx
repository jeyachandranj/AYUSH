import {courses} from '../components/constants/index.js'
import { useNavigate } from 'react-router-dom';  
import { FaBook } from 'react-icons/fa'; // Optional: Icon for visual appeal  

const CourseCard = ({ thumbnail, title, id }) => {  
  const navigate = useNavigate();  

  return (  
    <div  
      className="h-[300px] w-[300px] flex flex-col rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 transform bg-white border border-gray-200 shadow-lg hover:shadow-xl cursor-pointer"  
      onClick={() => navigate(`/course/${id}`)}  
    >  
      <div className="h-[80%] w-full rounded-t-lg overflow-hidden">  
        <img  
          src={thumbnail}  
          alt="thumbnail"  
          className="h-full w-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out scale-100 hover:scale-110"  
        />  
      </div>  

      <div className="h-[20%] w-full flex items-center justify-center bg-green-800 p-2 rounded-b-lg text-white font-bold text-center">  
        {title.length > 30 ? title.slice(0, 30) + "..." : title}  
      </div>  
    </div>  
  );  
};  

const Courses = () => {  
  const coursesLink = [  
    {  
      title: "Course 1",  
      thumbnail: "https://i0.wp.com/ayusampada.co.in/wp-content/uploads/2017/09/67029_large.jpg?fit=200%2C120&ssl=1",  
    },  
    {  
      title: "Course 2",  
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6gZ_BqmWyvJK66_MGDERPMrmYlr9eRNoJiEITAu4Lbm-d_zJDWQDEMFa8oErx0oYO8NQ&usqp=CAU",  
    },  
    {  
      title: "Course 3",  
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemm_xC0r9aIDkQMXIdTvsrSq5KmwZdPP6lg&s"
       },  
    {  
      title: "Course 4",  
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtwUmxugew8Rt0MN95L9NMd-aTVlPHYVFIRg&s",  
    },  
    {  
      title: "Course 5",  
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ514rtFNThWIjAWl5ZFf-gQejW7yynFokGZg&s",  
    },  
  ];  

  return (  
    <div className="bg-gray-50 min-h-screen py-12 ">  
      <h1 className="text-4xl font-bold text-center my-8 text-green-800 ">AYUSH COURSE</h1>  
      <div className="container mx-auto p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-gray-300 rounded-lg bg-white shadow-md w-[1299px]">  
        {courses.map((course, index) => (  
          <CourseCard  
            key={index}  
            title={course.title}  
            id={index}  
            thumbnail={coursesLink[index % coursesLink.length].thumbnail}   
          />  
        ))}  
      </div>  
    </div>  
  );  
};  

export default Courses;