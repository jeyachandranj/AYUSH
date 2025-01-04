import React, { useState, useEffect } from 'react';
import logo5 from '../../assets/logo5.jpg';
import logo4 from '../../assets/logo4.jpg';
import logo3 from '../../assets/logo3.jpeg';
import logo1 from '../../assets/logo1.jpg';
import webinars from '../../assets/webinars.jpg';
import mentor from '../../assets/mentor.webp';
import guide from '../../assets/guide.jpg';
import left from '../../assets/left.avif';
import right from '../../assets/right.avif';
import hack from '../../assets/hack.avif';
import win from '../../assets/win.avif';
import team from '../../assets/team.avif';
import Header from '../Landing/Header';
import "./Events.css";

const EventsPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: hack, alt: 'Hackathon Poster 1' },
    { src: win, alt: 'Hackathon Poster 2' },
    { src: team, alt: 'Hackathon Poster 3' },
    { src: hack, alt: 'Hackathon Poster 4' },
    { src: win, alt: 'Hackathon Poster 5' },
    { src: team, alt: 'Hackathon Poster 6' },
    { src: hack, alt: 'Hackathon Poster 7' },
    { src: win, alt: 'Hackathon Poster 8' },
    { src: team, alt: 'Hackathon Poster 9' }
  ];

  const moveSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
        <Header/>
      {/* Hackathon Section */}
      <section className="py-12 bg-white">
        <h2 className="text-center text-3xl font-semibold text-green-600">Hackathons</h2>
        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-64 object-cover"
                />
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => moveSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-green-600' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-lg">
              Welcome to the startup challenge for the AYUSH sector. Join us for exciting hackathons that push the boundaries of innovation in healthcare.
            </p>
            <a href="hackathon.html" className="inline-block mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">
              Know More
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-12 bg-gray-100">
        <h2 className="text-center text-3xl font-semibold text-green-600">Upcoming Events</h2>
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {eventCards.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>

      {/* Other Events Section */}
      <section className="py-12 bg-white">
        <h2 className="text-center text-3xl font-semibold text-green-600">Other Events</h2>
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FlipBox imgSrc="webinars.jpg" title="Webinars" link="webinars.html" />
          <FlipBox imgSrc="mentor.webp" title="Mentorships" link="mentor.html" />
          <FlipBox imgSrc="guide.jpg" title="Guides" link="guide.html" />
        </div>
      </section>
    </div>
  );
};

const eventCards = [
  {
    imgSrc: logo5,
    title: 'Ayush Health Camp',
    description: 'Join us for the Ayush Health Camp, where holistic health meets expert care!',
    link: '/events-page/0'
  },
  {
    imgSrc: logo4,
    title: 'Ayurveda Wellness Workshop',
    description: 'Learn the secrets of Ayurveda and its benefits in this upcoming workshop.',
    link: '/events-page/1'
  },
  {
    imgSrc: logo3,
    title: 'Workshop',
    description: 'Learn the secrets of Ayurveda and its benefits in this upcoming workshop.',
    link: '/events-page/2'
  },
  {
    imgSrc: logo1,
    title: 'Ayush Yoga Retreat',
    description: 'Relax and rejuvenate at our Ayush Yoga Retreat.',
    link:'/events-page/3'
  }
];
const EventCard = ({ event }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden card transition-transform duration-300 transform hover:scale-105 m-3">
      <img src={event.imgSrc} alt={event.title} className="h-48 w-full object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <a
          href={event.link}
          className="inline-block mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
        >
          Know More
        </a>
      </div>
    </div>
  );
  

const FlipBox = ({ imgSrc, title, link }) => (
  <div className="group relative h-64 w-full bg-gray-100 shadow-lg rounded-lg overflow-hidden m-4 mr-4">
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-transform duration-700 transform group-hover:rotate-y-180">
      <img src={imgSrc} alt={title} className="h-full w-full object-cover" />
      <h3 className="absolute text-white text-xl font-bold">{title}</h3>
    </div>
    <div className="absolute inset-0 bg-green-600 text-white flex items-center justify-center rotate-y-180 group-hover:rotate-y-0 transition-transform duration-700">
      <div className="text-center">
        <p>Click to explore!</p>
        <a href={link} className="mt-4 inline-block bg-white text-green-600 py-2 px-4 rounded-md">
          Know More
        </a>
      </div>
    </div>
  </div>
);

export default EventsPage;
