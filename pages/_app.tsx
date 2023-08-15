import '@/styles/globals.css'
import './style/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'
import {configureChains, goerli} from "@wagmi/core";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {createClient, WagmiConfig} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
    [goerli],
    [
      publicProvider()
    ],
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '6756806cba2601750f89e7fd325c28f1',
  chains
});

const wagmiConfig = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig client={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
}
