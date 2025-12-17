import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8 shadow-md">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-700">
                Prisha Motors<br />
                Islampur - PethNaka Road<br />
                Tal: Walwa, Dist: Sangli<br />
                Pin Code: 415409
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-700">
                <a href="tel:+919860001167" className="hover:text-blue-600 transition-colors">
                  9860001167
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-700">
                <a href="mailto:prishamotors1167@gmail.com" className="hover:text-blue-600 transition-colors">
                  prishamotors1167@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 