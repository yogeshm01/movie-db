import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const WatchLater = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4">
      <BookmarkIcon className="w-16 h-16 text-cyan-400 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Watch Later</h1>
      <p className="text-gray-400 text-lg text-center">
        No movies added yet. Start adding your favorites!
      </p>
    </div>
  );
};

export default WatchLater;
