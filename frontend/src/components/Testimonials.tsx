import React, { JSX } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Testimonials.css"; // Ensure this file exists

// Define the type for each testimonial
interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: string;
  avatar: string;
}

// Testimonials data
const testimonials: Testimonial[] = [
  {
    name: "Alice",
    role: "Final Year Student",
    text: "Chisel Yourself helped me identify my skill gaps and land my dream job at a top tech company. The personalized training paths were a game-changer!",
    rating: "⭐⭐⭐⭐⭐",
    avatar: "🧑‍💻",
  },
  {
    name: "Dr. Smith",
    role: "Professor at ABC University",
    text: "The platform has revolutionized how we prepare students for the job market. The real-time analytics and AI-powered matching are incredible!",
    rating: "⭐⭐⭐⭐⭐",
    avatar: "👩‍🏫",
  },
  {
    name: "Raj",
    role: "HR Manager at XYZ Corp",
    text: "We’ve found some of our best talent through Chisel Yourself. The skill-job matching is spot on, and the candidates are always well-prepared.",
    rating: "⭐⭐⭐⭐⭐",
    avatar: "👨‍💼",
  },
];

export default function Testimonials(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards at a time (for large screens)
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 1500, // Change slides every 1.5 seconds
    responsive: [
      {
        breakpoint: 768, // For tablets & small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials-section">
      <h2 className="testimonials-heading">What Our Users Say</h2>
      <Slider {...settings} className="testimonials-slider">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <span className="testimonial-avatar">{testimonial.avatar}</span>
            <div className="testimonial-content">
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-rating">{testimonial.rating}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
