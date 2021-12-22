import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const TableAction: FC<Props> = ({ children }) => {
  return (
    <td className="px-6 py-3 w-40 whitespace-nowrap text-right text-sm font-medium">
      {children}
    </td>
  )
}
