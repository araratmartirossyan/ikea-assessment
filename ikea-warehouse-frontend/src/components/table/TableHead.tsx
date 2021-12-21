import { FC } from 'react'

type Props = {
  children?: JSX.Element | JSX.Element[] | string
}

export const TableHead: FC<Props> = ({ children }) => {
  return (
    <th
      className="
      px-6
      py-3
      border-b border-gray-200
      bg-gray-50
      text-left text-xs
      font-medium
      text-gray-500
      uppercase
      tracking-wider
    "
    >
      <span className="lg:pl-2">{children}</span>
    </th>
  )
}
