import Link from "next/link";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { GigListing } from "~~/components/GigListing";

const GigPage = () => {
  const gig = {
    title: "Create Figma Designs for Web Applications",
    description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
    reward: "5 ETH",
    timeline: "2 weeks",
    client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  };

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto ">
        <div className="rounded mt-10 flex justify-between">
          <div className="flex justify-center flex-col w-2/3">
            <div className="font-bold text-3xl mb-2">{gig.title}</div>
            <div className="font-medium">{gig.description}</div>
            <div className="text-sm pt-5"><span className="font-medium">Gig posted by:</span> {gig.client}</div>
            <div className="text-sm pt-1"><span className="font-medium">Freelancer assigned:</span> N/A</div>
            <div className="tracking-widest font-medium text-sm"></div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-center mx-10">
              <div className="text-2xl font-bold">Unclaimed</div>
              <div className="tracking-widest font-medium text-sm">STATUS</div>
            </div>
            <div className="flex flex-col items-center mx-10">
              <div className="text-2xl font-bold">{gig.reward}</div>
              <div className="tracking-widest font-medium text-sm">REWARD</div>
            </div>
            <div className="flex flex-col items-center ml-10">
              <div className="text-2xl font-bold">{gig.timeline}</div>
              <div className="tracking-widest font-medium text-sm">TIMELINE</div>
            </div>
          </div>
        </div>
        <hr className="my-10" />
        <div className="w-100 text-center flex flex-col items-center">
          <div className="button bg-black text-white hover:opacity-50 p-3 w-fit px-10 rounded">Claim & Start Gig</div>
          <Link href="/">
            <div className="mt-5 text-neutral-500 hover:text-black underline">Back to all Gigs</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GigPage;
