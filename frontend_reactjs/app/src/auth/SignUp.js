import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const SignUp = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    role: '2', // Default to customer
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    role: '',
  });

  const [success, setSuccess] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }
    if (!formData.contact) {
      formErrors.contact = 'Contact is required';
      isValid = false;
    }
    if (!formData.address) {
      formErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }
    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData);
      setSuccess(response.data.msg);
      setErrors({});
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        contact: '',
        address: '',
        role: '2',
      });
    } catch (err) {
      setErrors({ general: err.response?.data?.msg || 'An error occurred' });
      setSuccess('');
    }
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
        {errors.general && <div className="text-red-500 mb-4">{errors.general}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="block w-full p-3 border border-gray-300 rounded"
            />
            {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="block w-full p-3 border border-gray-300 rounded"
            />
            {errors.email && <div className="text-red-500 mt-1">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="block w-full p-3 border border-gray-300 rounded"
            />
            {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="block w-full p-3 border border-gray-300 rounded"
            />
            {errors.contact && <div className="text-red-500 mt-1">{errors.contact}</div>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="block w-full p-3 border border-gray-300 rounded"
            />
            {errors.address && <div className="text-red-500 mt-1">{errors.address}</div>}
          </div>
          <div className="mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded"
            >
              <option value="2">Customer</option>
              <option value="3">Seller</option>
            </select>
          </div>
          <button
            ref={buttonRef}
            type="submit"
            className="w-full bg-[#007bff] text-white py-3 rounded border border-[#007bff] flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>Sign Up</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
