import { TrashIcon } from '@heroicons/react/solid'
import { useList, useStore } from 'effector-react'
import { useCallback } from 'react'
import { $order, removeFromOrder, submitOrder } from '../stores/order.store'

export const OrderSummary = () => {
  const orders = useStore($order)

  const price = useCallback(
    () =>
      orders.reduce((acc, curr) => {
        if (curr.isAvailiable) {
          return acc + curr.totalPrice
        }
        return acc
      }, 0),
    [orders]
  )

  const isAvailiable = useCallback(
    () => orders.every(item => item.isAvailiable),
    [orders]
  )

  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {useList(
            $order,
            ({ product_id, name, price, quantity, isAvailiable }) => (
              <li key={product_id} className="flex py-6 px-4 sm:px-6">
                <div className="ml-6 flex-1 flex flex-col">
                  <div className="flex">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm">
                        <a className="font-medium text-gray-700 hover:text-gray-800">
                          {name}
                        </a>
                      </h4>
                      {!isAvailiable && (
                        <small className="text-sm font-small text-red-400">
                          Not Availiable (One of the articles not availiable)
                        </small>
                      )}
                    </div>

                    <div className="ml-4 flex-shrink-0 flow-root">
                      <button
                        onClick={() => removeFromOrder(product_id)}
                        type="button"
                        className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 pt-2 flex items-end justify-between">
                    {isAvailiable && (
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {price}€ <small>X {quantity}</small>
                      </p>
                    )}
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">
              {price().toFixed(2)}€
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">
              {price().toFixed(2)}€
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            disabled={orders.length === 0 || !isAvailiable()}
            onClick={() => submitOrder()}
            className={
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:cursor-not-allowed w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
            }
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  )
}
