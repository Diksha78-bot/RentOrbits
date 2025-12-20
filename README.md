## 🚗 RentOrbits - Car Rental Website

A Modern, Responsive Car Rental Platform built using **React**, **TypeScript**, and **Tailwind CSS**.

RentOrbits provides a Smooth User Experience for Browsing Cars, learning about the Company, and Sending Rental Inquiries.

>
***

## 📑 Table of Contents
- ✨ [Features](#-features)
- 🛠️ [Prerequisites](#prerequisites)
- 📥 [Installation](#-installation)
- 🗂️ [Project Structure](#-project-structure)
- ⚡ [Technologies Used](#-technologies-used)
- 🌟 [Future Enhancements](#-future-enhancements)
- 🤝 [Contributing](#contributing)
- 📜 [License](#license)

>
***

## 💡 About RentOrbits

RentOrbits is a modern, open-source car rental platform designed to simplify the way users discover, explore, and inquire about rental cars. Built with React, TypeScript, and Tailwind CSS, RentOrbits focuses on clean design, smooth performance, and a scalable architecture that makes it easy for both users and developers.

Whether you're a customer looking for a hassle-free rental experience or a developer exploring a real-world full-stack project, RentOrbits brings usability, clarity, and modern web practices together in one place.

## 🎯 Our Mission

- 🚗 Simplify Car Rentals
Make browsing and exploring rental cars intuitive, fast, and user-friendly.
- 🧑‍💻 Developer-Friendly Codebase
Maintain clean, modular, and well-structured code that’s easy to understand and extend.
- 🌐 Open Source First
Encourage collaboration and learning through an accessible open-source project.
- ⚡ Performance & Responsiveness
Deliver a fast, lightweight experience that works seamlessly across all devices.

## 🌟 Why RentOrbits?

In a space often cluttered with outdated interfaces and complex workflows, RentOrbits proves that a car rental platform can be simple, elegant, and efficient.
By leveraging modern frontend tools and a scalable backend architecture, RentOrbits is ideal for:

- 🎓 Students learning full-stack web development
- 🛠 Developers looking to contribute to an open-source project
- 🚘 Businesses exploring a clean rental platform foundation

## 🚀 Future Vision

- 📅 Online car booking & availability management
- 💳 Secure payment gateway integration
- 📊 User dashboards with booking history
- 🧑‍💼 Admin panel for managing cars & bookings
- ⭐ Ratings, reviews & feedback system

## **✨ RentOrbits aims to be more than just a project — it’s a foundation for learning, collaboration, and real-world application.**

>
***

## ✨ Features

- 📱 Fully responsive design for all devices
- 🚘 Car listings with detailed information
- 📬 Contact form for customer inquiries
- 🏢 About page with company information
- 🎨 Modern UI built using Tailwind CSS

>
***

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

>
***

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/Diksha78-bot/RentOrbits.git
cd RentOrbits
```

2. Install dependencies (from root directory):
```bash
npm install
```

3. Start the development servers:

**Both frontend and backend together:**
```bash
npm start
```

**Or run individually:**

Frontend only:
```bash
npm run frontend
```

Backend only:
```bash
npm run backend
```

Frontend will be available at `http://localhost:3000` and backend API at configured port (typically `http://localhost:5000`).

>
***


## 📁 Project Structure 

```
RentOrbits/
│
├── .github/ISSUE_TEMPLATE/
│     └── pull_request_template.md
│     └── SECURITY.md
│     └── feature-request.md
│     └── bug-report.md
│     └── documentation-issue.md
│
│
├── frontend/                     # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   │      └── CarCard.tsx
│   │   │      └── CarCard.tsx
│   │   │      └── CarSkeleton.tsx
│   │   │      └── Chatbot.tsx
│   │   │      └── Contact.tsx
│   │   │      └── ErrorState.tsx
│   │   │      └── Footer.tsx
│   │   │      └── Login.tsx
│   │   │      └── LoginModal.tsx
│   │   │      └── Navbar.tsx
│   │   │      └── Notification.tsx
│   │   │      └── ProtectedRoute.tsx
│   │   ├── context/              # React Context (Auth context)
│   │   │      └── AuthContext.tsx
│   │   │      └── AuthContext.tsx
│   │   ├── pages/                # Page components
│   │   │      └── About.tsx
│   │   │      └── Cars.tsx
│   │   │      └── Contact.tsx
│   │   │      └── Home.tsx
│   │   │      └── Profile.tsx
│   │   │      └── Properties.tsx
│   │   ├── services/             # API and Firebase services
│   │   │      └── api.ts
│   │   │      └── firebase.ts
│   │   ├── utils/                # Utility functions
│   │   │      └── imageUtils.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── theme.ts
│   ├── public/                   # Static assets
│   │   ├── CarImages/
│   │   │      └── Audi A6.jpg
│   │   │      └── BMW 5 Series.jpg
│   │   │      └── Honda CR-V.jpg
│   │   │      └── Honda Civic.jpg
│   │   │      └── Hyundai Creta.jpg
│   │   │      └── Hyundai Verna.jpg
│   │   │      └── Hyundai i20.jpg
│   │   │      └── Mahindra XUV700.jpg
│   │   │      └── Maruti Swift.jpg
│   │   │      └── Mercedes-Benz-E-Class.jpg
│   │   │      └── Tata Altroz.jpg
│   │   │      └── Toyota Camry.jpg
│   │   │      └── Toyota Fortuner.jpg
│   │   │      └── Volvo S90.jpg
│   │   │      └── placeholder.jpg
│   │   ├── data/
│   │   │      └── cars.json
│   │   ├── images/
│   │   │      └── hero-bg.png
│   │   ├── 404.html
│   │   ├── index.html
│   │   ├── logo.png
│   │   ├── logo.svg
│   │   └── manifest.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── backend/                      # Node/Express API server
│   ├── src/                      # Backend source code
│   │     └── index.ts
│   ├── middleware/               # Express middleware (auth, etc)
│   │     └── auth.js
│   │     └── auth.ts
│   ├── models/                   # Database models (User, Car, Booking)
│   │     └── Booking.js
│   │     └── Booking.ts
│   │     └── Car.js
│   │     └── Car.ts
│   │     └── User.js
│   │     └── User.ts
│   ├── routes/                   # API routes
│   │     └── bookingRoutes.js
│   │     └── bookingRoutes.ts
│   │     └── carRoutes.js
│   │     └── carRoutes.ts
│   │     └── userRoutes.js
│   │     └── userRoutes.ts
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.ts
│   └── tsconfig.json
│
└── .env                          # Environment variables
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md               
├── LICENSE                       
├── README.md
├── desktop.ini                     
├── package.json                  # Root monorepo config

```
>
***

## ⚡ Technologies Used

**🎨 Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios (for API calls)
- Firebase (Authentication)

**🧠 Backend:**
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT (Authentication)
- BCryptJS (Password hashing)

>
***

## 🌟 Future Enhancements

- 🚀 Online car booking system
- 💳 Payment gateway integration
- 📊 User dashboard & booking history
- 🧑‍💼 Admin panel for car management
- ⭐ Ratings & reviews feature

>
***

## Contributing

## How to Contribute? 

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add some amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

Check out our [Contributing Guidelines](CONTRIBUTING.md) for more details!

>
***

## Contributors

Thanks to all the wonderful contributors 💖

<a href="https://github.com/Diksha78-bot/RentOrbits/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Diksha78-bot/RentOrbits" />
</a>

See full list of contributor contributions: [Contribution Graph](https://github.com/Diksha78-bot/RentOrbits/graphs/contributors)

>
***

## License

This project is licensed under the MIT License — see the LICENSE file for details.

>
***

## **⭐ If you like this project, don’t forget to give it a star!**
