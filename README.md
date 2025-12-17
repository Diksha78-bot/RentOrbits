# RentOrbits - Car Rental Website

A modern, responsive car rental website built with React, TypeScript, and Tailwind CSS.
## 📑 Table of Contents
- 🚀 [Features](#features)
- 🛠️ [Prerequisites](#prerequisites)
- 📥 [Installation](#installation)
- 🗂️ [Project Structure](#project-structure)
- ⚡ [Technologies Used](#technologies-used)
- 🖼️ [Screenshots](#screenshots)
- 🌟 [Future Enhancements](#future-enhancements)
- 🤝 [Contributing](#contributing)
- 📜 [License](#license)



## Features

- Responsive design for all devices
- Car listing with detailed information
- Contact form for inquiries
- About page with company information
- Modern UI with Tailtail CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

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

## Project Structure

```
RentOrbits/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature-request.md
│   │   ├── bug-report.md
│   │   ├── documentation-issue.md
│   │   └── pull_request_template.md
│   └── SECURITY.md
│
├── frontend/                     # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── context/              # React Context (Auth context)
│   │   ├── pages/                # Page components
│   │   ├── services/             # API and Firebase services
│   │   ├── utils/                # Utility functions
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── theme.ts
│   ├── public/                   # Static assets
│   │   ├── CarImages/
│   │   ├── data/
│   │   ├── images/
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
│   ├── middleware/               # Express middleware (auth, etc)
│   ├── models/                   # Database models (User, Car, Booking)
│   ├── routes/                   # API routes
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.ts
│   └── tsconfig.json
│
├── .gitignore
├── CONTRIBUTING.md               
├── LICENSE                       
├── README.md                     
├── package.json                  # Root monorepo config
├── node_modules/
└── .env                          # Environment variables

```

## Technologies Used

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios (for API calls)
- Firebase (Authentication)

**Backend:**
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT (Authentication)
- BCryptJS (Password hashing)

## Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add some amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

## License

This project is licensed under the MIT License — see the LICENSE file for details.
