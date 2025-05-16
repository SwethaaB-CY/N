import React, { JSX } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Testimonials.module.css"; // CSS module import

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: string;
  avatar: string;
}

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
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.testimonialsSection}>
      <h2 className={styles.testimonialsHeading}>What Our Users Say</h2>
      <Slider {...settings} className={styles.testimonialsSlider}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialCard}>
            <span className={styles.testimonialAvatar}>{testimonial.avatar}</span>
            <div className={styles.testimonialContent}>
              <h3 className={styles.testimonialName}>{testimonial.name}</h3>
              <p className={styles.testimonialRole}>{testimonial.role}</p>
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <p className={styles.testimonialRating}>{testimonial.rating}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
