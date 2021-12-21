import { AxiosResponse } from 'axios'
import { createEvent, createStore, createEffect, sample } from 'effector'
import axiosFn from '../utils/request'

// const products = createEvent()

interface ProductsResponse extends AxiosResponse {}

export const getProductsFx = createEffect(async () => {
  const response = await axiosFn<ProductsResponse>({
    url: 'products'
  })

  if (response.statusText !== 'ok') {
    throw Error(response.statusText)
  }
  return response.data
})

export const $productsError = createStore({}).on(
  getProductsFx.failData,
  (state, error) => error
)

export const $products = createStore([]).on(
  getProductsFx.doneData,
  (_, products) => products
)

// export const $selectedBeer = createStore(null);
// export const selectBeer = createEvent();
// $selectedBeer.on(selectBeer, (state, beer) => beer);
