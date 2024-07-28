import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SignUp = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <div ref={formRef}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
            
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <select
            name="role"
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
          <button
            ref={buttonRef}
            className="w-full bg-[#007bff] text-white py-3 rounded border border-[#007bff] flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
