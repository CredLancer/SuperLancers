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
          <div className="mt-4">Gigs Approved and Minted</div>
        </div>
        <br />
        <div className="w-100 flex flex-wrap justify-between">
          {mintedGigTitles && mintedGigDescription && mintedGigTitles.map((title, index) => (
            <div key={index} className="text-center px-10 rounded p-4" style={{ width: 400 }}>
              <div className="bg-neutral-900 p-4">
                <img src="" alt="" />
                <IdentificationIcon className="w-20 m-auto" />
                <div className="title text-lg font-bold">{title}</div>
                <div className="desc">{mintedGigDescription[index]}</div>
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
