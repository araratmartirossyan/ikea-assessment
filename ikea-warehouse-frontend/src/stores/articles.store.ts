import { createStore, createEffect } from 'effector'
import axiosFn from '../utils/request'

import { Warehouse } from '..'

export const getArticlesFx = createEffect(async () => {
  const response = await axiosFn<Warehouse.ArticlesReponse>({
    url: 'articles'
  })

  if (response.statusText !== 'OK') {
    throw Error(response.statusText)
  }
  return response.data
})

export const $isEmptyArticles = createStore(true)

export const $articlesError = createStore({}).on(
  getArticlesFx.failData,
  (state, error) => error
)

$isEmptyArticles.on(getArticlesFx.doneData, (_, data) => {
  return data.length === 0
})

export const $articles = createStore<Warehouse.ArticleEntity[]>([]).on(
  getArticlesFx.doneData,
  (_, articles) => articles
)
