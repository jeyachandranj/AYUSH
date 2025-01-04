import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails, Guide, Startup, Mentor, Investor } from "./components/index";
import { ChakraProvider, Spinner,useToast } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Bot from './pages/bot';
import Login from "./components/Login/login";
import { Home ,Status,ForgotPassword,Courses} from './pages';
import { useAuth } from './services/AuthContext';
import { useEffect, useState } from "react";
import axiosHeader from "./axiosHeader";
import AddClerk from "./components/government/AddClerk";
import ViewStartups from "./components/government/ViewStartups";
import Registration from "./pages/Registration";
import InvestorRegistration from "./pages/InvestorRegistration";
import MentorRegistration from "./pages/MentorRegistration";
import Webinars from "./components/mentor/Webinars"
import UserType from './components/Registration/UserType';
import CertificateGenerator from "./pages/CertificateGenerator";
import SearchBar from "./components/List/SearchBar";
import Meeting from "./components/mentor/Meeting";
import MentorAsked from "./components/mentor/MentorAsked";
import Mentorship from "./components/mentor/Mentorship";
import ProductDevelopment from "./components/Landing/ProductDevelopment";
import CommunityEngagement from "./components/Landing/CommunityEngagement";
import KeysAndInitiativesPages from "./components/Landing/KeysAndIntiativesPages";
import Events from "./components/events/Events";
import EventsPage from "./components/events/EventPage";
import Scheme from "./components/scheme/Scheme"
import SchemePage from "./components/scheme/SchemePage"
import CourseVideos from "./pages/CourseVideos";
const App = () => {
  const [data, setData] = useState(null);
  const [type,setType]=useState(0);
  const toast = useToast(); 
  const { user, loading } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get('auth/me');
        localStorage.setItem('data', JSON.stringify(response.data));
        setData(response.data); // Store the data in state
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: 'Session Expired',
          description: 'Login again to continue',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    };

    if (user) { // Fetch data only if 'user' exists
      fetchData();
    }
  }, [user]);
  if (loading) {
    return <Spinner size="xl" />; // Show a loading spinner or placeholder
  }
  return (
    <ChakraProvider>
      <Routes>
        {/* //development purpose */}

        <Route path='/scheme' element={<Scheme />} />
        <Route path='/scheme/:id' element={<SchemePage />} />
        <Route path='/search' element={<SearchBar />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events-page/:id" element={<EventsPage />} />
        <Route path='product-development' element={<ProductDevelopment />} />
        <Route path='community-engagement' element={<CommunityEngagement />} />
        <Route path='/keys-and-initiatives/:id' element={<KeysAndInitiativesPages />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Registration/>}/>
        <Route path='/register/mentor' element={<MentorRegistration/>}/>
        <Route path='/register/investor' element={<InvestorRegistration/>}/>
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseVideos />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/register/mentor" element={<MentorRegistration/>} />
        <Route path="/register/investor" element={<InvestorRegistration />} />
        <Route path="/mentor/meeting/" element={<Meeting/> } />
        <Route path="/mentor/meeting/:id" element={<Meeting/> } />
        <Route path="/webinars" element={<Webinars/> } />
        <Route path="/startupAsked" element={<MentorAsked/> } />
        {/*testing purposes  */}
        
        {user && (
          <>
            <Route path="/bot" element={<Bot />} />
            <Route path='/guide' element={<Guide  type={type}/>} />
            <Route path='/government' element={<GovernWorkspace />} />
            <Route path='/government/create' element={<AddClerk />} />
            <Route path='/startupView/:startupId' element={<CompanyDetails />} />
            <Route path='/approvedStartups' element={<ViewStartups />} />
            <Route path="/status" element={<Status id={user.id} />} />
            <Route path="/startup/:id" element={<Startup />} />
            <Route path="/viewMentorship" element={<Mentorship/> } />
            {/* <Route path="/" component={SearchBar} />
             */}
            <Route path='/UserType' element={<UserType setType={setType}/>}/>
            <Route path='/mentor/:id' element={<Mentor/>}/>
            <Route path='/investor/:id' element={<Investor/>}/>
          </>
        )}
      </Routes>
      <Bot/>
    </ChakraProvider>
  );
}

export default App;
