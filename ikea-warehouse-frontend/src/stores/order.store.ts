import { createEffect, createEvent, createStore } from 'effector'
import { toast } from 'react-toastify'

import { getProductsFx } from './products.store'
import axiosFn from '../utils/request'
import { Warehouse } from '..'

// UserChoise
export const $userChoices = createStore<Warehouse.ProductEntity[]>([])
export const userChoise = createEvent<Warehouse.ProductEntity>()

$userChoices.on(userChoise, (state, product) => {
  const foundProductIndex = state.findIndex(
    currProduct => currProduct.product_id === product.product_id
  )

  if (foundProductIndex === -1) {
    if (product.quantity !== 0) {
      state = [
        ...state,
        {
          ...product,
          quantity: product.quantity,
          totalPrice: product.quantity * product.price
        }
      ]
    }
    return state
  }

  if (product.quantity === 0) {
    return state.filter(({ product_id }) => product_id !== product.product_id)
  }

  return state.map(item => {
    if (item.product_id === product.product_id) {
      return {
        ...item,
        quantity: product.quantity,
        totalPrice: product.quantity * product.price
      }
    }
    return item
  })
})

// Order
export const $order = createStore<Warehouse.ProductEntity[]>([])

export const addToOrder = createEvent()
export const removeFromOrder = createEvent<number>()

export const checkProduct = createEffect(async () => {
  const products = $userChoices
    .getState()
    .map(({ product_id, quantity }) => ({ product_id, quantity }))

  const response = await axiosFn<Warehouse.ProductsResponse>({
    url: 'orders',
    method: 'post',
    data: {
      products
    }
  })

  return response.data
})

$order.on(checkProduct.doneData, (state, result) => {
  state = [...result]
  return state
})

$order.on(removeFromOrder, (state, productId) => {
  return state.filter(({ product_id }) => product_id !== productId)
})

export const submitOrder = createEffect(async () => {
  const products = $order
    .getState()
    .map(({ product_id, quantity }) => ({ product_id, quantity }))

  await axiosFn<Warehouse.ProductsResponse>({
    url: 'orders/submit',
    method: 'post',
    data: {
      products
    }
  })

  getProductsFx()
  toast.success('Order submitted')
  return []
})
$userChoices.on(submitOrder.doneData, () => [])
$order.on(submitOrder.doneData, (_, result) => result)
