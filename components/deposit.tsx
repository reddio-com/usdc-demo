import React, {useCallback, useState} from "react";
import {depositUSDC} from "@/config/config";

export default function Deposit() {
    const [amount, setAmount] = useState('')
    const deposit = useCallback(
        async (type: any) => {
            try {
                await depositUSDC(Number(amount))
            } catch (e) {
                console.log(e);
            }
        },
        [amount],
    );

    return <div>
        <p className="Text">
            You can deposit UDSC to your account here.
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
            <button className="Button green" onClick={deposit}>Deposit</button>
        </div>
    </div>
}
