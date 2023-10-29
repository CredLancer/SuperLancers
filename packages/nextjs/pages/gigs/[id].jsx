import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

import {
  useAccount,
} from 'wagmi'

const GigPage = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [functionName, setFunctionName] = useState("")

  const { data: gig } = useScaffoldContractRead({
    contractName: "GigMarketplace",
    functionName: "getGigById",
    args: [router.query.id]
  });

  console.log({ gig })

  const states = ["Available", "In Progress", "Finished", "Approved"]
  const statecolor = ["white", "orange", "red", "green"]

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "GigMarketplace",
    functionName: functionName,
    blockConfirmations: 1,
    args: [router.query.id],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    if (!gig) return;

    if (gig.status === 0)
      setFunctionName("claimAndStartGig")

    if (gig.status === 1)
      setFunctionName("markGigAsFinished")

    if (gig.status === 2)
      setFunctionName("approveGig")

  }, [gig]);

  if (!gig) return <></>

  const freelancerActions = (
    <>
      {
        gig.status === 0 &&
        <div className="button bg-primary hover:cursor-pointer text-white hover:opacity-50 p-3 w-fit px-10 rounded" onClick={writeAsync}>Claim & Start Gig</div>
      }
      {
        gig.status === 1 &&
        <div className="button bg-primary hover:cursor-pointer text-white hover:opacity-50 p-3 w-fit px-10 rounded" onClick={writeAsync}>Mark Gig as Completed</div>
      }
      {
        gig.status === 2 && address === gig.freelancer &&
        (
          <>
            <div className="mb-3">You've marked this gig as complete, please wait for the gig owner to approve your work.</div>
          </>
        )
      }
    </>
  );

  const ownerActions = (
    <>
      {
        gig.status === 2 &&
        (
          <>
            <div className="mb-3"></div>
            <div className="button bg-green-600 text-white hover:opacity-50 p-3 w-fit px-10 rounded" onClick={writeAsync}>Approve Work</div>
          </>
        )
      }
    </>
  );

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto ">
        <div className="rounded mt-10 flex justify-between">
          <div className="flex justify-center flex-col w-2/3">
            <div className="font-bold text-3xl mb-2">{gig.title}</div>
            <div className="font-medium">{gig.description}</div>
            <div className="text-sm pt-5"><span className="font-medium">Gig posted by:</span> {gig.creator}</div>
            <div className="text-sm pt-1"><span className="font-medium">Freelancer assigned:</span> {gig.freelancer}</div>
            <div className="tracking-widest font-medium text-sm"></div>
          </div>
          <div className="flex items-center justify-end w-1/2">
            <div className="flex flex-col items-center mx-10">
              <div className={`text-2xl font-bold`} style={{ color: `${statecolor[gig.status]}` }}> {states[gig.status]}</div>
              <div className="tracking-widest font-medium text-sm">STATUS</div>
            </div>
            <div className="flex flex-col items-center mx-10">
              <div className="text-2xl font-bold">{gig.reward.toString()} FLR</div>
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
          {
            (isLoading || isMining) ? <>Loading...</> : (
              <>
                {gig.freelancer && freelancerActions}
                {address === gig.creator && ownerActions}
              </>
            )
          }
          <Link href="/find">
            <div className="mt-5 text-neutral-500 hover:text-black underline">Back to all Gigs</div>
          </Link>
        </div>
      </div >
    </>
  );
};

export default GigPage;
