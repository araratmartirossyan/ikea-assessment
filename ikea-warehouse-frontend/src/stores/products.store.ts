import { createStore, createEffect, sample } from 'effector'
import { Warehouse } from '..'
import axiosFn from '../utils/request'

export const getProductsFx = createEffect(async () => {
  const response = await axiosFn<Warehouse.ProductsResponse>({
    url: 'products'
  })

  if (response.statusText !== 'OK') {
    throw Error(response.statusText)
  }
  return response.data
})

export const $isEmptyProducts = createStore(true)

export const $productsError = createStore({}).on(
  getProductsFx.failData,
  (state, error) => error
)

$isEmptyProducts.on(getProductsFx.doneData, (_, data) => {
  return data.length === 0
})

export const $products = createStore<Warehouse.ProductEntity[]>([]).on(
  getProductsFx.doneData,
  (_, products) => products
)
