import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { GigListing } from "~~/components/GigListing";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

const Home: NextPage = () => {
  const { data: gigsList } = useScaffoldContractRead({
    contractName: "GigMarketplace",
    functionName: "listGigs",
  });

  // const gigs = [{
  //   id: 1,
  //   title: "Create Figma Designs for Web Applications",
  //   description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
  //   reward: "5 ETH",
  //   timeline: "2 weeks",
  //   client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  // }, {
  //   id: 1,
  //   title: "Create Figma Designs for Web Applications",
  //   description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
  //   reward: "5 ETH",
  //   timeline: "2 weeks",
  //   client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  // }, {
  //   id: 1,
  //   title: "Create Figma Designs for Web Applications",
  //   description: "Some long ass description can go here that will be really detailed about the specifications of the job that is required.",
  //   reward: "5 ETH",
  //   timeline: "2 weeks",
  //   client: "0x9853434112De1B46B19d9D4495d47A21fA6c7B8e"
  // }];

  const gigListingComponents = gigsList && gigsList.sort((a, b) => a.status - b.status).map((g, i) => <GigListing {...g} key={i} />);

  console.log({ gigsList })

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto mt-10">
        <div className=" flex justify-between items-center">
          <div className="text-4xl font-bold">Find a Gig</div>
          <Link href="/gigs/create">
            <div className="button bg-black text-white hover:opacity-50 p-3 w-fit px-10 rounded">Create New Gig</div>
          </Link>
        </div>
        <br />
        {(!gigsList || gigsList.length === 0) && <>No gigs are currently available</>}
        {gigListingComponents}
        <br />
      </div>
    </>
  );
};

export default Home;
