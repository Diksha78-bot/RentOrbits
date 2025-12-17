import React from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCalendarAlt,
  faEdit,
  faCar,
  faHouseUser,
  faHeart,
  faClockRotateLeft,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.displayName || "User"
  )}&background=111827&color=fff&bold=true&size=140`;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-50">
      {/* PAGE HEADER */}
      <div className="bg-primary-600 py-16 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-white">My Profile</h1>
        <p className="text-white/80 text-lg mt-2">Manage your account and rentals</p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* PROFILE CARD */}
        <div className="bg-neutral-800 shadow-xl border border-neutral-700 rounded-2xl p-8 flex flex-col md:flex-row gap-8">

          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-36 h-36 rounded-full border-4 border-primary-500 shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">{user?.displayName || "Guest User"}</h2>
              <button className="text-primary-500 hover:text-primary-400 transition">
                <FontAwesomeIcon icon={faEdit} className="text-xl" />
              </button>
            </div>

            <p className="flex items-center gap-3 text-neutral-300">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
              {user?.email}
            </p>

            <p className="flex items-center gap-3 text-neutral-300">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500" />
              Member Since:&nbsp;
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>

            {/* Premium Label */}
            <div className="inline-flex items-center gap-2 bg-primary-700/40 px-3 py-1 rounded-full text-sm font-medium text-primary-300 border border-primary-700">
              <FontAwesomeIcon icon={faCrown} />
              Standard User
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          {[
            { icon: faCar, text: "My Car Bookings" },
            { icon: faHouseUser, text: "My Property Rentals" },
            { icon: faHeart, text: "Favorites" },
            { icon: faClockRotateLeft, text: "Rental History" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-800/90 backdrop-blur-md rounded-xl p-6 flex items-center gap-4 border border-neutral-700 shadow-md cursor-pointer hover:scale-[1.03] transition-transform duration-300"
            >
              <FontAwesomeIcon icon={item.icon} className="text-primary-500 text-3xl" />
              <p className="text-lg font-semibold">{item.text}</p>
            </div>
          ))}
        </div>

        {/* RENTAL HISTORY PLACEHOLDER */}
        <div className="mt-12 bg-neutral-800 rounded-xl p-8 border border-neutral-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Rental History</h2>
          <div className="text-neutral-400 text-center py-6">
            <p>No rental history yet.</p>
            <p className="text-sm mt-1">Your bookings will appear here after your first rental.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
