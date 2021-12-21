import { FC } from 'react'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const TableCell: FC<Props> = ({ children }) => {
  return (
    <td
      className="
      px-6
      py-3
      max-w-0
      w-content
      whitespace-nowrap
      text-sm
      font-medium
      text-gray-900
    "
    >
      {children}
    </td>
  )
}
