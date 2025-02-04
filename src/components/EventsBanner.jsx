import React from "react";
import Image from "next/image";

const EventsBanner = () => {
  return (
      <div className="relative w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 mt-16 md:mt-32 h-[300px] md:h-[350px]">
        <div className="absolute inset-0">
          <Image
              src="/bannerbg.svg"
              alt="Event Background"
              fill
              className="rounded-xl object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 flex items-center text-white">
          <div className="w-full md:w-1/2 px-4">
            <h1 className="text-xl md:text-4xl font-bold leading-tight">
              Discover and experience extraordinary Events
            </h1>
            <p className="mt-2 text-sm md:text-lg">
              Enter the world of events. Discover now the latest events or start
              creating your own!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button className="px-4 py-2 text-black bg-white rounded-xl">
                Discover Now
              </button>
              <button className="px-4 py-2 rounded-xl">
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventsBanner;
