
import {loadStripe} from '@stripe/stripe-js'
import { CheckoutSessionResponse, Item } from '../types/payment'
import { bcUrl } from './service'

const stripePromise = loadStripe('pk_test_51Pasv8RsaIimtk2XwWtrjd9kYRP7CofzORAl5drehfEO5mKl1uyFqcGgZnX8MXsazDRdpDw869V1RHGqpe6sugm700s2R11iXR')

export const createCheckoutSession = async (items: Item[]) => {
    const response = await fetch(`${bcUrl}/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items ),
      });
    
      const session: CheckoutSessionResponse = await response.json();
      console.log(session.id)
      return session.id;
}

export const redirectToCheckout = async (sessionId: string): Promise<void> => {
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
  
      if (error) {
        console.error('Stripe checkout error:', error);
      }
    }
  };