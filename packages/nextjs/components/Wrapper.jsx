import { useEthersSigner } from '~~/services/web3/ethers'
import { EtherspotTransactionKit } from "@etherspot/transaction-kit";

export default function Wrapper(props) {
  const provider = useEthersSigner();

  console.log({ provider: provider?.provider })

  return (
    <EtherspotTransactionKit provider={provider?.provider}>
      {props.children}
    </EtherspotTransactionKit>
  );

}