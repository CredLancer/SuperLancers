import React from "react";
import Link from "next/link";

export const GigListing = ({
  id,
  title,
  description,
  reward,
  timeline,
  creator
}) => {
  return (
    <Link href={`/gigs/${id}`}>
      <div className="w-100 bg-neutral-100 rounded p-10 mt-4 hover:opacity-50 hover:cursor-pointer flex justify-between border-2 border-black">
        <div className="flex justify-center flex-col w-1/2">
          <div className="font-bold text-xl">{title}</div>
          <div className="">{description}</div>
          <div className="text-xs pt-3">Posted by: {creator}</div>
          <div className="tracking-widest font-medium text-sm"></div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center mr-10">
            <div className="text-2xl font-bold">{reward.toString()} FLR</div>
            <div className="tracking-widest font-medium text-sm">REWARD</div>
          </div>
          <div className="flex flex-col items-center ml-10">
            <div className="text-2xl font-bold">{timeline}</div>
            <div className="tracking-widest font-medium text-sm">TIMELINE</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
