import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About RentOrbits</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Founded in 2024, RentOrbits has quickly become a trusted name in the car rental industry.
          We started with a simple mission: to provide reliable, affordable, and high-quality car rental
          services to our customers.
        </p>
        <p className="text-gray-600">
          Today, we're proud to offer a diverse fleet of vehicles, from economical sedans to luxury SUVs,
          all maintained to the highest standards of safety and comfort.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">
              We prioritize our customers' needs and strive to provide the best possible service
              experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              Every vehicle in our fleet undergoes regular maintenance and thorough inspections
              to ensure your safety and comfort.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-600">
          Our dedicated team of professionals is committed to making your car rental experience
          smooth and enjoyable. From our customer service representatives to our maintenance crew,
          everyone at RentOrbits works together to ensure your satisfaction.
        </p>
      </section>
    </div>
  );
};

export default About; 