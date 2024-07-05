import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import summaryAPI from '../common';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

const ViewUserCart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingCart = new Array(4).fill(null);
    const context = useContext(Context);
    const {fetchCartCount}=useContext(Context)


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(summaryAPI.viewCart.url, {
                method: summaryAPI.viewCart.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
            });
            const responseData = await response.json();
            if (responseData.success) {
                setCartData(responseData.data);
            }
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCart = async (id, qty) => {
        try {
            const response = await fetch(summaryAPI.updateCartProduct.url, {
                method: summaryAPI.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty
                })
            });
            const responseData = await response.json();
            if (responseData.success) {
                setCartData(prevCartData => prevCartData.map(item => 
                    item._id === id ? { ...item, quantity: qty } : item
                ));
                toast.success("Product quantity updated");
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Failed to update cart:', error);
        }
    };

    const deleteCartProduct = async (id) => {
        
            const response = await fetch(summaryAPI.deleteCart.url, {
                method: summaryAPI.deleteCart.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                })
            });
            const responseData = await response.json();
            if (responseData.success) {
                setCartData(prevCartData => prevCartData.filter(item => item._id !== id));
                fetchCartCount();
                toast.success("Product removed from cart");
            } else {
                toast.error(responseData.message);
            }
        
    };

    const totalQty = cartData.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = cartData.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue?.productId?.sellingPrice), 0);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    cartData.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col  lg:flex-row gap-10 lg:justify-between p-4'>
                {/***view product */}
                <div className='w-full h-[calc(100vh-155px)] max-w-3xl overflow-y-scroll scrollbar-none'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => (
                                <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>
                            ))
                        ) : (
                            cartData?.map((product) => (
                                <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <Link to={"/buyNow/"+product?.productId?._id} className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage?.[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={product?.productId?.productName} />
                                    </Link>
                                    <div className='px-4 py-2 relative'>
                                        {/**delete product */}
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>

                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateCart(product?._id, product?.quantity - 1)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateCart(product?._id, product?.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                {/***summary  */}

                {
                    cartData.length !== 0 && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>
    
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>
                                    </div>
    
                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
                                </div>
                            )
                        }
                    </div>

                    )
                }
                
            </div>
        </div>
    )
}

export default ViewUserCart;
