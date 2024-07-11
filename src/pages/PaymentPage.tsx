import React, { useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Item } from "../types/payment";
import { createCheckoutSession, redirectToCheckout } from "../service/payment";

const PaymentPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleCheckout=async()=>{
  //     // await axios.post(`${bcUrl}/payment/create-checkout-session`,
  //     //     items
  //     // ,{
  //     //     headers:{
  //     //         "Content-Type": "application/json",
  //     //     }
  //     // }).then(({res})=>{
  //     //     console.log(res)
  //     // }).catch((e)=>{
  //     //     console.error(e)
  //     // })

  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const items: Item[] = [
      { name: "Business Coaching Session", price: 20, quantity: 1 },
    ];

    try {
      const sessionId = await createCheckoutSession(items);
      await redirectToCheckout(sessionId);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] justify-center items-center ">
      <form onSubmit={handleSubmit}>
        {loading && <CardElement />}
        {error && <div>{error}</div>}

        <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-xs ">
          <h2 className="text-lg font-semibold mb-2">New Laptop</h2>
          <p className="text-gray-700 mb-2">${(2000 / 100).toFixed(2)}</p>
          <p className="text-gray-700 mb-4">Quantity: {1}</p>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            // onClick={onAddToCart}
          >
            Buy Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
