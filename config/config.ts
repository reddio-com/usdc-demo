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
    key = await reddio.keypair.generateFromEthSignature()
}

const depositUSDT = async (amount: number) => {
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

const withdrawUSDT = async (amount: number) => {
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

export { initReddio, generateKey, depositUSDT, getBalance, withdrawUSDT, getWithdrawArea, withdrawToWallet }
