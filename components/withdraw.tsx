import React, {useCallback, useState} from "react";
import {getBalance, withdrawUSDC} from "@/config/config";
import useSWR from "swr";
import {ethers} from "ethers";

export default function Withdraw() {
    const { data } = useSWR('balance', getBalance)
    const balanceData = data?.data[0]

    const [amount, setAmount] = useState('')
    const withdraw = useCallback(
        async (type: any) => {
            try {
                await withdrawUSDC(Number(amount))
            } catch (e) {
                console.log(e);
            }
        },
        [amount],
    );

    return <div>
        <p className="Text">
            You can withdraw {ethers.utils.formatUnits(balanceData?.balance_available || 0, balanceData?.decimals)} USDT to withdraw area here.
        </p>
        <fieldset className="Fieldset">
            <label className="Label" htmlFor="amount">
                Amount
            </label>
            <input className="Input" id="amount" onChange={e => setAmount(e.target.value) } />
        </fieldset>
        <div
            style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}
        >
            <button className="Button green" onClick={withdraw}>Withdraw</button>
        </div>
    </div>
}
