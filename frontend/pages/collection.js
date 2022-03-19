import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Collection from '../components/sections/Collection';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import axios from 'axios';
import nftAbi from '../contracts/FathomyachtClub.json';
import leaseAbi from '../contracts/Leasing.json';

const leaseContractAddress = process.env.NEXT_PUBLIC_LEASE_CONTRACT_ADDRESS;
const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
const tokenBatchURI = process.env.NEXT_PUBLIC_TOKEN_BATCH_URI;

export default function Location() {
    const [myTokens, setMyTokens] = useState([]);
    const [leasingTokens, setLeasingTokens] = useState([]);
    const [loading, setLoading] = useState(false);
    const walletAddr = useSelector((state) => state.address);
    const router = useRouter();

    const getTokens = async () => {
        try {
            setLoading(true);
            const { ethereum } = window;
            var w3 = new Web3(ethereum);
            var nftContractInstance = new w3.eth.Contract(nftAbi, nftContractAddress);
            const tokens = await nftContractInstance.methods.getTokensOfHolder(walletAddr).call();
            const leasableTokens = await getLeasableTokens();
            const metas = [];
            for(let i = 0; i < tokens.length; i++) {
                const metaData = await axios.get(tokenBatchURI + '/' + tokens[i]);

                let tokenIsLeasable = false;
                leasableTokens.forEach(item => {
                    if (tokens[i] == item['tokenId'] && item['price'] > 0) {
                        tokenIsLeasable = true;
                    }
                })
                
                metas.push({
                    leasable: tokenIsLeasable,
                    ...metaData?.data
                });
            }
            console.log('[metas]', metas);
            setLoading(false);
            setMyTokens(metas);

            
        }
        catch(err) {
            console.log('[err]', err);
        }
    }

    const onTokenClick = (tokenId) => {
        router.push('/tokens/' + tokenId);
    }

    const getLeasableTokens = async () => {
        try {
            const { ethereum } = window;
            const w3 = new Web3(ethereum);
            const leaseContractInstance = new w3.eth.Contract(leaseAbi, leaseContractAddress);
            const result = await leaseContractInstance.methods.getLeasableTokens().call();
            console.log('[getLeasableTokens]', result);
            setLeasingTokens(result);

            return result;
        }
        catch (err) {
            console.log('[err]', err);
        }
    }

    const getLease = async () => {
        try {
            const { ethereum } = window;
            const w3 = new Web3(ethereum);
            const leaseContractInstance = new w3.eth.Contract(leaseAbi, leaseContractAddress);
            const result = await leaseContractInstance.methods.getLeasingTokens(walletAddr).call();
            console.log('[getLeasableTokens]', result);

            return result;
        }
        catch (err) {
            console.log('[err]', err);
        }
    }

    useEffect(() => {
        if (walletAddr) getTokens();
    }, [walletAddr]);

    return (
        <React.Fragment>
            <Head>
                <title>My Collection - Fathom Yacht Club</title>
                <meta name="description" content="Generated by create next app" />
            </Head>
    
            <main className="sm:pt-20">
                <section className="bg-background-light pt-16 sm:mt-1 pb-16">
                    <div className="container w-4/5">
                        <h1 className="text-primary text-center font-bold font-muli text-5xl sm:text-6xl py-6">My Collection</h1>
                    </div>
                </section>

                {
                    loading ? (
                        <React.Fragment>
                            <div className="container flex items-center justify-center p-28">
                                <span className="block animate-spin bg-transparent border-3 border-t-primary rounded-full h-10 w-10"></span>
                            </div>
                        </React.Fragment>
                    ) : (
                        <section>
                            <Collection tokens={myTokens} leasingTokens={leasingTokens} onTokenClick={onTokenClick} />
                        </section>
                    ) 
                }
            </main>
        </React.Fragment>
    );
};