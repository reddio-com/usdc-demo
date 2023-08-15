import React, {useEffect} from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as Tabs from '@radix-ui/react-tabs'
import Deposit from "@/components/deposit";
import {watchAccount} from "@wagmi/core";
import {initReddio, generateKey} from "@/config/config";
import Balance from "@/components/balance";
import Withdraw from "@/components/withdraw";
import WithdrawArea from "@/components/withdrawArea";

let isInit = false

const TabsDemo = () => {
  useEffect(() => {
    initReddio()
    watchAccount(async (account) => {
      if (account.address && !isInit) {
        isInit = true
        await generateKey()
      }
    });
  }, []);
  return (
      <main className='h-screen'>
        <header className='h-[80px] flex justify-center items-end flex-col-reverse pr-8'>
          <ConnectButton />
        </header>
        <div className='flex justify-center items-center '>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                Deposit
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Withdraw
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab3">
                Withdraw Area
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab4">
                Balance
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="TabsContent" value="tab1">
              <Deposit />
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab2">
              <Withdraw />
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab3">
              <WithdrawArea />
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="tab4">
              <Balance />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </main>
  )
}

export default TabsDemo
