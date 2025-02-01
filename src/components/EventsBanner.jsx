import React from "react";
import Image from "next/image";

const EventsBanner = () => {
  return (
    <div className="relative mx-24 mt-32 h-[350px]">
      <div className="absolute inset-0">
        <Image
          src="/eventsBannerbg.png"
          alt="Event Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-xl"
          priority
        />
      </div>
      <div className="absolute inset-0 flex text-white">
        <div className="text-left px-4 ml-12 mt-12 w-[30%]">
          <h1 className="text-4xl font-bold">
            Discover and experience extraordinary Events
          </h1>
          <p className="text-lg mt-2">
            Enter in the world of events. Discover now the
            latest Events or start creating your own!
          </p>
          <div className="mt-12">
            <button className="bg-white rounded-xl text-black px-4 py-2 mr-8">
              Discover Now
            </button>
            <button>Watch Video</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsBanner;
