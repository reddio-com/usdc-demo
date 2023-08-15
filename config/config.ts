import {Reddio, SignTransferParams} from "@reddio.com/js";
import {ethers} from "ethers";
import {getAccount} from "@wagmi/core";

let reddio: Reddio;
let key: {
    privateKey: string;
    publicKey: string;
};

const usdcContractAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F'

const initReddio = () => {
    if (typeof window !== 'undefined' && !reddio) {
        reddio = new Reddio({
            env: 'test',
        });
    }
};

const generateKey = async () => {
    key = {
        "privateKey": "17b900ade984d0886d4dfea7d4d74a08cf4aeda8589b21d1b4b7dc36e2e1045",
        "publicKey": "0x1e6c020796cfda4a88178817361647376df8a2415404e5a7cf6784bd3b0fbb4"
    }
}

const depositUSDC = async (amount: number) => {
    const tx = await reddio.erc20.approve({
        tokenAddress: usdcContractAddress,
        amount,
    });
    await tx.wait();
    return reddio.apis.depositERC20({
        starkKey: key.publicKey,
        quantizedAmount: amount,
        tokenAddress: usdcContractAddress,
    });
}

const withdrawUSDC = async (amount: number) => {
    const params: SignTransferParams = {
        starkKey: key.publicKey,
        privateKey: key.privateKey,
        amount,
        receiver: getAccount().address!,
        type: 'ERC20',
        contractAddress: usdcContractAddress,
    };
    return reddio.apis.withdrawalFromL2(params)
}

const getBalance = async () => {
    const { data } = await reddio.apis.getBalancesV3({
        starkKey: key.publicKey,
        contractAddress: usdcContractAddress,
    })
    return data
}

const getWithdrawArea = async () => {
    const { data } = await reddio.apis.withdrawalStatus({
        ethaddress: getAccount().address!,
        stage: 'withdrawarea',
    });
    return data
}

const withdrawToWallet = async (item: any) => {
    return reddio.apis.withdrawalFromL1({
        ethAddress: getAccount().address!,
        type: item.type,
        assetType: item.asset_type,
    });
}

export { initReddio, generateKey, depositUSDC, getBalance, withdrawUSDC, getWithdrawArea, withdrawToWallet }
