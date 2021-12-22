// Depedencies
import { useEffect, useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { useStore } from 'effector-react'
import { ToastContainer } from 'react-toastify'

// Components
import {
  MobileSidebar,
  Sidebar,
  MainWrapper,
  ProductTable,
  OrderSummary,
  FileUpload
} from './components'

// stores
import { $isEmptyProducts, getProductsFx } from './stores/products.store'
import { $isEmptyArticles, getArticlesFx } from './stores/articles.store'
import { EmptyState } from './components/EmptyState'
import { combine } from 'effector'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    getProductsFx()
    getArticlesFx()
  }, [])

  const isLoading = useStore(getProductsFx.pending)
  const isEmptyArticles = useStore($isEmptyArticles)

  const isEmptyProducts = useStore($isEmptyProducts)
  const isEmpty = combine(
    $isEmptyArticles,
    $isEmptyProducts,
    (emptyArticles, emptyProducts) => emptyArticles || emptyProducts
  ).getState()

  return (
    <>
      <ToastContainer />
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <MainWrapper title="Warehouse">
            <div className="flex">
              <FileUpload fileType="articles" />

              {!isEmptyArticles && <FileUpload fileType="products" />}
            </div>
            {isEmpty && <EmptyState />}
            {!isEmpty && (
              <div className="flex w-full">
                <div className="w-full mr-4 mt-11">
                  <ProductTable />
                </div>
                <div className="w-1/2">
                  <OrderSummary />
                </div>
              </div>
            )}
          </MainWrapper>
        </div>
      </div>
    </>
  )
}
