import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import Currency from 'react-currency-formatter'
import { useSelector } from 'react-redux'

import { selectItems, selectTotal } from 'slices/basketSlice'
import CheckoutProduct from 'components/CheckoutProduct'
import Header from 'components/Header'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
  const [session] = useSession()
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)

  const createCheckoutSession = async () => {
    const stripe = await stripePromise

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
    })

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result.error) alert(result.error.message)
  }

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={'https://links.papareact.com/ikj'}
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? 'Your Amazon Basket Is Empty.'
                : 'Your Shopping Basket'}
            </h1>

            {items.map(item => (
              <CheckoutProduct key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md mb-5">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) items:
              </h2>
              <span className="font-bold">
                <Currency quantity={total} currency="BRL" />
              </span>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout
