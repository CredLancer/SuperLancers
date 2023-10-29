import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { GigListing } from "~~/components/GigListing";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import {
  useAccount,
} from 'wagmi'

const Home: NextPage = () => {
  const { address } = useAccount();
  const { data: mintedGigTitles } = useScaffoldContractRead({
    contractName: "GigMarketplace",
    functionName: "getAllMintedGigTitlesByAddress",
    args: [address] // provide a default value of 0 if address is undefined
  });

  const { data: mintedGigDescription } = useScaffoldContractRead({
    contractName: "GigMarketplace",
    functionName: "getAllMintedGigDescriptionsByAddress",
    args: [address] // provide a default value of 0 if address is undefined
  });
  return (
    <>
      <MetaHeader />
      <div className="container mx-auto mt-10">
        <div className="my-20">
          <div className="text-7xl font-bold">My Profile</div>
          <div className="mt-4">Address: {address}</div>
        </div>
        <hr />
        <br />
        <div className="text-2xl mb-1 mt-7 font-bold">Smart Credentials</div>
        <div className="text-sm mb-10">Previous gigs that have been marked as completed and approved, will appear here as smart credentials, send to the user as an ERC-1155</div>
        <div className="w-100 flex flex-wrap justify-between">
          {mintedGigTitles && mintedGigTitles.map((title, index) => (
            <div key={index} className="rounded mr-10" style={{ minWidth: 300 }}>
              <div className="bg-neutral-900 border-primary border-2 rounded p-6 py-10">
                <img src="" alt="" />
                <IdentificationIcon className="w-20 text-primary" />
                <div className="title font-bold mt-5">{title}</div>
                <div className="title text-sm">{mintedGigDescription && mintedGigDescription[index]}</div>
                <div className="title text-xs mt-10 text-neutral-400">ERC1155 Smart Credential</div>
                {/* <div className="desc">{mintedGigDescription[index]}</div> */}
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>
    </>
  );
};

export default Home;
