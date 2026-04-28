/home/zerwiz/CodeP/Residential/src/App.jsx
import { useState } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Properties', href: '#properties' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const properties = [
    {
      id: 1,
      title: 'Villa Serenitas',
      location: 'Tuscany, Italy',
      price: '€3,500,000',
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4800,
      image: '/images/property-1.jpg',
    },
    {
      id: 2,
      title: 'Casa del Mare',
      location: 'Amalfi Coast, Italy',
      price: '€2,800,000',
