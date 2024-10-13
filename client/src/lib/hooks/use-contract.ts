/* eslint-disable */
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import { useEffect, useState } from "react";
import {
  Add,
  ReceiveAndWithdraw,
} from "../../../../contracts/wrappers/TestGay";
import { useAsyncInitialize } from "./use-async-initialize";
import { useTonClient } from "./use-ton-client";
import { useTonConnect } from "./use-ton-connect";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function useContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [balance, setBalance] = useState<string | null>(null);

  const contract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;

    const contractAddress = Address.parse(
      "EQD8jIEtXLb3DmJORLOOW-0yhTMgiWgYlJnItS4CY5uLw8X3"
    );
    const contractInstance = ReceiveAndWithdraw.fromAddress(contractAddress);
    // You can view it at https://testnet.tonscan.org/address/EQD8jIEtXLb3DmJORLOOW-0yhTMgiWgYlJnItS4CY5uLw8X3
    return client.open(contractInstance) as OpenedContract<ReceiveAndWithdraw>;
  }, [client, wallet]);

  const getBalance = async () => {
    if (!contract) return;

    //@ts-ignore
    const contractBalance = await contract.getBalance();
    setBalance(fromNano(contractBalance));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const fetchBalancePeriodically = async () => {
      await getBalance();
      interval = setInterval(getBalance, 5000);
    };

    fetchBalancePeriodically();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [contract]);

  return {
    contractAddress: contract?.address.toString(),
    balance,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Add: (amount: any) => {
      const message: Add = {
        $$type: "Add",
        amount: amount,
      };
      // @ts-expect-error
      contract?.send(
        sender,
        {
          value: toNano(0.1),
        },
        message
      );
    },
  };
}
