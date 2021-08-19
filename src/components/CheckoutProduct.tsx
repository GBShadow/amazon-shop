import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter'
import { StarIcon } from '@heroicons/react/solid'
import { addToBasket, IProduct, removeFromBasket } from 'slices/basketSlice'
import { useDispatch } from 'react-redux'

type CheckoutProductProps = {
  item: IProduct
}

function CheckoutProduct({ item }: CheckoutProductProps) {
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket(item))
  }

  const removeItemToBasket = () => {
    dispatch(removeFromBasket({ id: item.id }))
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={item.image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{item.title}</p>
        <div className="flex">
          {Array(item.rating)
            .fill('')
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{item.description}</p>
        <Currency quantity={item.price} currency="BRL" />

        {item.hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button mt-auto">
          Add to Basket
        </button>
        <button onClick={removeItemToBasket} className="button mt-auto">
          Remove to Basket
        </button>
      </div>
    </div>
  )
}

export default CheckoutProduct
