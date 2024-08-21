"use client"
import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 10px',
          fontSize: '16px',
          backgroundColor: 'gray',
          color: '#fff',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M12 8l6 6H6z"/>
        </svg>
      </button>
    )
  );
};

export default ScrollToTopButton;
