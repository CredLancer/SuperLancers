import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { GigListing } from "~~/components/GigListing";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

const Home: NextPage = () => {
  // const { data: gigsList } = useScaffoldContractRead({
  //   contractName: "GigMarketplace",
  //   functionName: "listGigs",
  // });

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

  // const gigListingComponents = gigsList && gigsList.sort((a, b) => a.status - b.status).map((g, i) => <GigListing {...g} key={i} />);

  // console.log({ gigsList })

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto mt-10">
        <div className="my-20">
          <div className="text-7xl font-extrabold">SuperLancers</div>
          <div className="mt-4">A privacy-preserving talent platform built on trust and verifiable credentials</div>

          <div className="mt-4">
            <Link href="/find">
              <div className="btn btn-primary  rounded-md font-bold normal-case px-10 cursor-auto mr-4">
                Find gigs
              </div>
            </Link>
            <Link href="/gigs/create">
              <div className="btn btn-white  rounded-md font-bold normal-case px-10 cursor-auto">
                Create a gig
              </div>
            </Link>
          </div>
        </div>
        <br />
        <div className="w-100 flex flex-wrap justify-between">
          <div className="w-1/3 text-center px-10 rounded p-4">
            <div className="bg-neutral-900 p-4">
              <img src="" alt="" />
              <div className="title text-lg font-bold">Problem</div>
              <div className="desc">Some long description can go here that will be really detailed about the specifications of the job that is required.</div>
            </div>
          </div>
          <div className="w-1/3 text-center px-10 rounded p-4">
            <div className="bg-neutral-900 p-4">
              <img src="" alt="" />
              <div className="title text-lg font-bold">Solution</div>
              <div className="desc">Some long description can go here that will be really detailed about the specifications of the job that is required.</div>
            </div>
          </div>
          <div className="w-1/3 text-center px-10 rounded p-4">
            <div className="bg-neutral-900 p-4">
              <img src="" alt="" />
              <div className="title text-lg font-bold">Problem</div>
              <div className="desc">Some long description can go here that will be really detailed about the specifications of the job that is required.</div>
            </div>
          </div>
        </div>
        {/* {(!gigsList || gigsList.length === 0) && <>No gigs are currently available</>} */}
        {/* {gigListingComponents} */}
        <br />
      </div>
    </>
  );
};

export default Home;
