// Depedencies
import { useEffect, useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { useStore, useList } from 'effector-react'

// Components
import {
  MobileSidebar,
  Sidebar,
  Table,
  TableCell,
  TableAction,
  TableHead,
  MainWrapper
} from './components'

// stores
import {
  $productsError,
  getProductsFx,
  $products
} from './stores/products.store'

const products = [
  {
    name: 'Dining Chair',
    product_id: 1,
    quantity: 2,
    contain_articles: [
      {
        art_id: '1',
        amount_of: '4'
      },
      {
        art_id: '2',
        amount_of: '8'
      },
      {
        art_id: '3',
        amount_of: '1'
      }
    ],
    price: 39.99
  },
  {
    name: 'Dining Table',
    product_id: 2,
    quantity: 0,
    contain_articles: [
      {
        art_id: '1',
        amount_of: '4'
      },
      {
        art_id: '2',
        amount_of: '8'
      },
      {
        art_id: '4',
        amount_of: '1'
      }
    ],
    price: 99.99
  }
]

const Error = () => {
  const error = useStore($productsError)
  return error && 'Whoops something went wrong'
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    getProductsFx()
  }, [])

  const isLoading = useStore(getProductsFx.pending)

  return (
    <>
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
          <MainWrapper title="Products">
            {isLoading && <span>Is Loading</span>}

            <Table
              header={
                <tr>
                  <TableHead key="product"> Product </TableHead>
                  <TableHead key="Stock"> Stock </TableHead>
                  <TableHead key="Actions"> Actions </TableHead>
                </tr>
              }
            >
              {useList($products, ({ product_id, name, quantity }) => (
                <tr key={product_id}>
                  <TableCell>
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={`${
                          quantity > 0 ? 'bg-green-600' : 'bg-red-600'
                        } flex-shrink-0 w-2.5 h-2.5 rounded-full`}
                        aria-hidden="true"
                      />
                      <a href="#" className="truncate hover:text-gray-600">
                        <span>{name}</span>
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span>{quantity}</span>
                  </TableCell>
                  <TableAction>
                    <a className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                      Add To Order
                    </a>
                  </TableAction>
                </tr>
              ))}
            </Table>
          </MainWrapper>
        </div>
      </div>
    </>
  )
}
