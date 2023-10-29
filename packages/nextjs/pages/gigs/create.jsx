import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useState } from "react";
import { useRouter } from 'next/navigation'

const CreateGig = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [timeline, setTimeline] = useState("");

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "GigMarketplace",
    functionName: "createGig",
    args: [title, description, timeline, reward],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      router.push("/find");
    },
  });

  const fireCreation = () => {
    if (!title) return;
    if (!description) return;
    if (!reward) return;
    if (!timeline) return;
    writeAsync();
  }

  return (
    <>
      <MetaHeader />
      <div className="container mx-auto mt-10 max-w-2xl">
        <div className=" flex justify-between items-center">
          <div className="text-3xl font-bold">Create a New Gig</div>
        </div>
        <br />
        <form action="">
          <div className="mb-5">
            <label for="email" className="block mb-2 text-sm font-medium text-white">Gig Title</label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="email" className="bg-gray-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " placeholder="Figma designs for website" required />
          </div>
          <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-white">Gig Description</label>
            <input onChange={(e) => setDescription(e.target.value)} value={description} id="password" className="bg-gray-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " placeholder="Need someone to help me redeisgn my bakery's website" required />
          </div>
          <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-white">Timeline</label>
            <input onChange={(e) => setTimeline(e.target.value)} value={timeline} id="password" className="bg-gray-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " required placeholder="2 months" />
          </div>
          <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-white">Gig Reward in FLR</label>
            <input onChange={(e) => setReward(e.target.value)} value={reward} id="password" className="bg-gray-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " required placeholder="1" />
          </div>
          {
            isLoading || isMining ? <div>Loading...</div> : <button onClick={fireCreation} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          }
        </form>
      </div>
    </>
  );
};

export default CreateGig;
