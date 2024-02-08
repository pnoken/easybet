'use client'
import React from 'react'
import { ChainProvider } from '@azuro-org/sdk'
import { ApolloProvider } from '@azuro-org/sdk/nextjs/apollo'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonMumbai } from 'viem/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

// In this example app we'll use free publicnode.com RPC urls,
// you can change it on your own or continue using public.
// Also, we'll use polygon mumbai for DEV.
// To launch in prod, you must change it to one of the prod chains (Polygon, Gnosis, etc.)
const rpcUrls: Record<number, string> = {
    [polygonMumbai.id]: 'https://polygon-mumbai-bor.publicnode.com',
}

// base chain config
const { chains, publicClient } = configureChains(
    [polygonMumbai],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http: rpcUrls[chain.id],
            }),
        }),
        publicProvider(),
    ]
)

// rainbowkit connector config
const { connectors } = getDefaultWallets({
    appName: 'Azuro',
    projectId: 'b2a0e6f30535abee26b20562513c6cb4', // get your own project ID - https://cloud.walletconnect.com
    chains,
})

// final wagmi config
const wagmiConfig = createConfig({
    connectors,
    publicClient,
})

export function Providers(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <ChainProvider initialChainId={polygonMumbai.id}>
                    <ApolloProvider>
                        {children}
                    </ApolloProvider>
                </ChainProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}