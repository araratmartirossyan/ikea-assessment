import { ShoppingBagIcon, ViewListIcon } from '@heroicons/react/outline'

export const navigation = [
  { name: 'Products', to: '/', icon: ShoppingBagIcon, current: true },
  { name: 'Orders', href: '/orders', icon: ViewListIcon, current: false }
]
