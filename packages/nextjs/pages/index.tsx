import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { GigListing } from "~~/components/GigListing";

const Home: NextPage = () => {
  const gigs = [{
    title: "Create Figma Designs for Web Applications",
    description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
    reward: "5 ETH",
    timeline: "2 weeks",
    client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  }, {
    title: "Create Figma Designs for Web Applications",
    description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
    reward: "5 ETH",
    timeline: "2 weeks",
    client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  }, {
    title: "Create Figma Designs for Web Applications",
    description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
    reward: "5 ETH",
    timeline: "2 weeks",
    client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  }];

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto mt-10">
        <div className="text-3xl font-bold mb-7">Find a Gig</div>
        {gigs.map((g, i) => <GigListing {...g} key={i} />)}
      </div>
    </>
  );
};

export default Home;
