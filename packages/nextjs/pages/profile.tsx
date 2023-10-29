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
  // const { data: gigsList } = useScaffoldContractRead({
  //   contractName: "GigMarketplace",
  //   functionName: "listGigs",
  // });

  // console.log({ gigsList })

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto mt-10">
        <div className="my-20">
          <div className="text-7xl font-bold">My Profile</div>
          <div className="mt-4">Address: {address}</div>
        </div>
        <br />
        <div className="w-100 flex flex-wrap justify-between">
          <div className="text-center px-10 rounded p-4" style={{ width: 400 }}>
            <div className="bg-neutral-900 p-4">
              <img src="" alt="" />
              <IdentificationIcon className="w-20 m-auto" />
              <div className="title text-lg font-bold">Credential</div>
              <div className="desc">Name of job here</div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default Home;
