import React from "react";
import Link from "next/link";

const states = ["Available", "In Progress", "Finished", "Approved"];
const statecolor = ["black", "orange", "red", "green"];

export const GigListing = ({
  id,
  title,
  description,
  reward,
  timeline,
  creator,
  status
}) => {
  return (
    <Link href={`/gigs/${id}`}>
      <div className="w-100 bg-neutral-100 rounded p-10 mt-4 hover:opacity-50 hover:cursor-pointer flex flex-wrap justify-between border-2 border-black" style={{ borderColor: `${statecolor[status]}` }}>
        <div className="flex justify-center flex-col w-1/2">
          <div className="font-bold text-xl">{title}</div>
          <div className="">{description}</div>
          <div className="text-xs pt-3">Posted by: {creator}</div>
          <div className="tracking-widest font-medium text-sm"></div>
        </div>
        <div className="flex items-center lg:w-1/2 xl:w-1/3 sm:w-2/3 md:mt-0 sm:mt-5 justify-between flex-wrap pr-5">
          <div className="flex flex-col items-center xl:w-1/3">
            <div className={`text-2xl font-bold`} style={{ color: `${statecolor[status]}` }}> {states[status]}</div>
            <div className="tracking-widest font-medium text-sm">STATUS</div>
          </div>
          <div className="flex flex-col items-center xl:w-1/3">
            <div className="text-2xl font-bold">{reward.toString()} FLR</div>
            <div className="tracking-widest font-medium text-sm">REWARD</div>
          </div>
          <div className="flex flex-col items-center xl:w-1/3">
            <div className="text-2xl font-bold">{timeline}</div>
            <div className="tracking-widest font-medium text-sm">TIMELINE</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
