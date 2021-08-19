import { createSlice } from '@reduxjs/toolkit'

export type IProduct = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  hasPrime: boolean
  rating: number
}

type IState = {
  basket: {
    items: IProduct[]
  }
}

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )

      if (itemIndex >= 0) {
        let newItemList = [...state.items]

        newItemList.splice(itemIndex, 1)

        state.items = newItemList
      } else {
        console.warn('Item does not exist in basket')
      }
    },
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Selectors - This is how we pull information from the Global store slice
export const selectItems = ({ basket }: IState) => basket.items
export const selectTotal = ({ basket }: IState) =>
  basket.items.reduce((acc, item) => (acc += item.price), 0)

export default basketSlice.reducer
