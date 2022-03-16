import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../buttons/Button';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, clearCart } from '../../store/actions';
import Web3 from 'web3';

export default function Cart({ memberShip }) {
    const { abi } = require("../../contracts/FathomyachtClub.json");
    const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

    const [loading, setLoading] = useState(false);
    const [minted, setMinted] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    function removeItem(index) {
        dispatch(removeCartItem(index));
    }

    async function mint(qty, tierNumber, price) {
        try {
            const { ethereum } = window;

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const w3 = new Web3(ethereum);
            const contract_abi = new w3.eth.Contract(abi, contractAddress);
            const totalPrice = String(price * qty);
            const result = await contract_abi.methods.mintBatch(qty, tierNumber).send({from: accounts[0], value: w3.utils.toWei(totalPrice)});
    
            return result;
        }
        catch (err) {
            console.log('[err]', err);
            setLoading(false);
        }
    }

    async function mintMatch(e) {
        try {
            setMinted(false);
            setLoading(true);
            let result;
            for (const item of cart) {
                result = await mint(item.qty, item.tierNumber, item.price);
            }

            if (result?.status) {
                setMinted(true);
                dispatch(clearCart());
                scrollTo(e, 'cart-container');
            }

            setLoading(false);
        }
        catch (err) {
            console.log('[err]', err);
            setLoading(false);
        }
    }

    async function getTierPrice() {
        const tierNumber = 2;
        const { ethereum } = window;
        var w3 = new Web3(ethereum);
        var contract_abi = new w3.eth.Contract(abi, w3.utils.toChecksumAddress(contractAddress));
        const tierPrice = w3.utils.fromWei(await contract_abi.methods.getTierPrice(tierNumber).call());
        console.log('[tierPrice]', tierPrice);

        return tierPrice;
    }

    async function getTotalSupply() {
        const { ethereum } = window;
        var w3 = new Web3(ethereum);
        var contract_abi = new w3.eth.Contract(abi, w3.utils.toChecksumAddress(contractAddress));
        const totalSupply = await contract_abi.methods.totalSupply().call();
        console.log('[totalSupply]', totalSupply);

        return totalSupply;
    }

    const scrollTo = (e, id) => {
        e.preventDefault();

        try {
            const width = window.innerWidth;
            const adder = 100;

            if (width < 768) {
                adder = 15;
            }

            const elem = document.getElementById(id);
            const height = elem.offsetTop - adder;
            window.scrollTo(0, height);
        }
        catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log('[cart]', cart);
        if (cart.length > 0) {
            setMinted(false);
            const cartValue = 0;
            cart.forEach(item => {
                cartValue += parseFloat(item.price) * item.qty;
            });
            setCartTotal(cartValue);
        };
    }, [cart]);

    return (
        <div className="p-4 border rounded-xl border-gray-200">
            <h2 className="font-light text-3xl py-2 mb-4 font-muli" onClick={getTotalSupply}>Checkout</h2>
            <div className="py-2">
                <h4 className="font-medium mb-4">Please review your order selection</h4>

                { minted && cart?.length == 0 && <div className="mb-8">
                    <div className="text-2xl text-center text-primary font-medium py-6">Thank you for purchasing { memberShip } membership!</div>
                    <div className="flex items-center justify-center">
                        <Link href="/">
                            <a className="uppercase bg-gradient-to-br w-72 text-center from-background-primary to-background-secondary text-17px text-white py-3 px-9 rounded-full font-pop font-semibold focus:ring-4">View my collection</a>
                        </Link>
                    </div>
                </div> }

                <div className="py-2">
                    <div className="grid grid-cols-4 border-b border-gray-300">
                        <div className="uppercase text-xs font-light text-left p-4">Membership</div>
                        <div className="uppercase text-xs font-light text-center p-4">Quantity</div>
                        <div className="uppercase text-xs font-light text-right p-4">Price</div>
                        <div className="uppercase text-xs font-light text-right p-4"></div>
                    </div>

                    {
                        cart?.length ? (
                            cart.map((item, index) => {
                                return (
                                    <div className="grid grid-cols-4 border-b border-gray-300" key={index}>
                                        <div className="uppercase text-sm font-medium text-left p-4">{item.membership}</div>
                                        <div className="uppercase text-sm font-medium text-center p-4">{item.qty}</div>
                                        <div className="uppercase text-sm font-medium text-right p-4">{item.price}</div>
                                        <div className="uppercase text-sm font-medium text-right p-4">
                                            <button className="uppercase underline text-primary" onClick={() => removeItem(index)}>Remove</button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-2xl text-center font-light py-6">Your cart is empty</div>
                        )
                    }
                    
                    <div className="border-t gray-300 w-full h-1"></div>
                    <div className="flex items-center justify-end pt-8 text-base">
                        <div className="w-full lg:w-1/3">
                            <div className="py-4 flex items-center justify-between">
                                <span>Subtotal</span>
                                <span>{cartTotal} ETH</span>
                            </div>
                            <div className="py-4 flex items-center justify-between">
                                <span>Gas*</span>
                                <span>{ 0.014 * cart.length } ETH</span>
                            </div>
                            <div className="border-t border-gray-300 font-medium py-4 flex items-center justify-between">
                                <span>Total</span>
                                <span>{ cartTotal + 0.014 * cart.length } ETH</span>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 flex items-center justify-center">
                        <Button
                         theme="primary"
                         className={`w-72 h-12 text-center ${cart.length == 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-1'} ${loading && 'cursor-not-allowed' }`}
                         disabled={loading || cart.length == 0 ? true :  false}
                         onClick={mintMatch}
                        >
                            { loading ? <span
                             className="block animate-spin bg-transparent border-3 border-b-white border-t-blue-400 rounded-full h-5 w-5 ..." viewBox="0 0 24 24"
                            ></span> : 
                            <span>Continue to Purchase</span> }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};