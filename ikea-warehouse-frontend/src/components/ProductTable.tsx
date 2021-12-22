import { useList } from 'effector-react'

import { $products } from '../stores/products.store'
import { checkProduct, userChoise } from '../stores/order.store'

import { Table, TableCell, TableAction, TableHead } from './table'

export const ProductTable = () => {
  return (
    <Table
      header={
        <tr>
          <TableHead key="product"> Product </TableHead>
          <TableHead key="Stock"> Stock </TableHead>
          <TableHead key="Actions"> Actions </TableHead>
        </tr>
      }
    >
      {useList($products, product => (
        <tr key={product.product_id}>
          <TableCell>
            <div className="flex items-center space-x-3 lg:pl-2">
              <div
                className={`${
                  product.quantity > 0 ? 'bg-green-600' : 'bg-red-600'
                } flex-shrink-0 w-2.5 h-2.5 rounded-full`}
                aria-hidden="true"
              />
              <a href="#" className="truncate hover:text-gray-600">
                <span>{product.name}</span>
              </a>
            </div>
          </TableCell>
          <TableCell>
            <span>{product.quantity}</span>
          </TableCell>
          <TableAction>
            {/* Make component out of select */}
            <select
              onChange={({ target: { value } }) =>
                userChoise({
                  ...product,
                  quantity: Number(value)
                })
              }
              className="mr-5 rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {[...Array(product.quantity + 1).keys()].map(item => (
                <option key={`${product.product_id}_${item}`}>{item}</option>
              ))}
            </select>
            <button
              onClick={() => checkProduct()}
              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
            >
              Add To Order
            </button>
          </TableAction>
        </tr>
      ))}
    </Table>
  )
}
