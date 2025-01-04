import React from 'react';
import logo4 from "../../assets/logo4.jpg";
import { useParams } from 'react-router-dom';
import logo1 from "../../assets/logo1.jpg";
import logo3 from "../../assets/logo3.jpeg";
import logo5 from "../../assets/logo5.jpg";
import logo2 from "../../assets/logo2.jpeg";
const well = () => {
  const {id}=useParams();
  const eventData = data[id];
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Event Detail Header */}
      <div className="text-center py-6">
        <h1 className="text-green-700 text-4xl sm:text-5xl font-bold">
          {eventData.title}
        </h1>
      </div>

      {/* Event Detail Container */}
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl">
        {/* Event Image */}
        <img
          src={eventData.imageSrc}
          alt={eventData.title}
          className="w-full h-auto rounded-xl mb-8 shadow-md"
        />

        {/* Event Description */}
        <div className="text-gray-700 text-lg leading-relaxed mb-8">
          <p>{eventData.description}</p>
        </div>

        {/* Event Info */}
        <div className="space-y-4 mb-8">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <strong>Date:</strong> {eventData.date}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <strong>Time:</strong> {eventData.time}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <strong>Location:</strong> {eventData.location}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <strong>Contact:</strong> {eventData.contact}
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center">
          <a
            href={eventData.registerLink}
            className="inline-block bg-green-600 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-green-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};
const data = [
    {
      title: 'Ayurveda Wellness Workshop',
      imageSrc: logo1, // Replace with the actual image URL
      description: 'Learn the secrets of Ayurveda and its benefits in this upcoming workshop. Dive into the core principles of Ayurveda, including holistic treatments, dietary recommendations, and lifestyle practices.',
      date: 'October 15, 2024',
      time: '9:00 AM - 2:00 PM',
      location: 'Ayush Wellness Center, Mumbai',
      contact: 'contact@ayurvedahealth.in',
      registerLink: 'https://example.com/register-workshop',
    },
    {
      title: 'Ayush Yoga Retreat',
      imageSrc: logo2, // Replace with the actual image URL
      description: 'Relax and rejuvenate at our Ayush Yoga Retreat. Experience deep relaxation through guided yoga sessions, meditation, and breathwork. Ideal for beginners and seasoned practitioners alike.',
      date: 'November 5, 2024',
      time: '8:00 AM - 6:00 PM',
      location: 'Ayush Retreat Center, Rishikesh',
      contact: 'retreat@ayushyoga.in',
      registerLink: 'https://example.com/register-retreat',
    },
    {
      title: 'Herbal Medicine Workshop',
      imageSrc: logo3, // Replace with the actual image URL
      description: 'Discover the power of herbal medicine at our interactive workshop. Learn how to prepare natural remedies using herbs, essential oils, and Ayurvedic ingredients for daily wellness.',
      date: 'December 10, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Ayush Herbal Center, Bengaluru',
      contact: 'info@herbalmedicine.in',
      registerLink: 'https://example.com/register-herbal',
    },
    {
      title: 'Panchakarma Detox Program',
      imageSrc: logo5, // Replace with the actual image URL
      description: 'Join our Panchakarma Detox Program to cleanse your body and mind using ancient Ayurvedic detox techniques. This 7-day retreat will focus on rejuvenation through specialized Ayurvedic therapies.',
      date: 'December 20, 2024',
      time: 'All Day Event',
      location: 'Ayush Wellness Resort, Kerala',
      contact: 'detox@ayurvedaresort.in',
      registerLink: 'https://example.com/register-panchakarma',
    },
  ];
  

export default well;