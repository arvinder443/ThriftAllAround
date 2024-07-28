// SignIn.js
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FaSignInAlt } from 'react-icons/fa';
import SignUp from './SignUp';

const SignIn = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const inputsRef = useRef([]); // Define inputsRef
  const [signUpOpen, setSignUpOpen] = useState(false);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
      );
    }
  }, [open]);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 0.5,
      ease: 'power2.inOut'
    });
    gsap.to(buttonRef.current, {
      backgroundColor: '#1e90ff',
      duration: 0.5,
      ease: 'power2.inOut',
      delay: 0.5
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scaleX: 1,
      scaleY: 1,
      backgroundColor: '#007bff',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  const handleFocus = (index) => {
    gsap.to(inputsRef.current[index], {
      borderColor: '#1e90ff',
      boxShadow: '0 0 8px rgba(30, 144, 255, 0.5)',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  };

  const handleBlur = (index) => {
    gsap.to(inputsRef.current[index], {
      borderColor: '#ccc',
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  };

  if (!open) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          ref={modalRef}
          className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <div ref={formRef}>
            <input 
              type="text" 
              placeholder="Username" 
              className="block w-full p-3 mb-4 border border-gray-300 rounded"
              ref={(el) => (inputsRef.current[0] = el)}
              onFocus={() => handleFocus(0)}
              onBlur={() => handleBlur(0)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="block w-full p-3 mb-4 border border-gray-300 rounded"
              ref={(el) => (inputsRef.current[1] = el)}
              onFocus={() => handleFocus(1)}
              onBlur={() => handleBlur(1)}
            />
            <button 
              ref={buttonRef}
              className="w-full bg-[#007bff] text-white py-3 rounded border border-[#007bff] flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
              onClick={onClose}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaSignInAlt />
              <span>Sign In</span>
            </button>
            <p className="mt-4 text-center">
              Don't have an account? <button onClick={() => setSignUpOpen(true)} className="text-blue-500">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
      <SignUp open={signUpOpen} onClose={() => setSignUpOpen(false)} />
    </>
  );
};

export default SignIn;
