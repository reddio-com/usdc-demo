import React, {useCallback, useState} from "react";
import {getBalance, getWithdrawArea, withdrawToWallet, withdrawUSDT} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";

export default function WithdrawArea() {
    const { data } = useSWR('getWithdrawArea', getWithdrawArea)

    const value = data?.data[0]?.display_value || 0

    const [amount, setAmount] = useState('')
    const withdraw = useCallback(
        async (type: any) => {
            try {
                await withdrawToWallet(data?.data[0])
            } catch (e) {
                console.log(e);
            }
        },
        [data?.data],
    );

    return <div>
        <p className="Text">
            You can withdraw {value} USDT to your wallet here.
        </p>
        <div
            style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}
        >
            <button className="Button green" onClick={withdraw}>Withdraw</button>
        </div>
    </div>
}
