import { FC } from 'react'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const TableAction: FC<Props> = ({ children }) => {
  return (
    <td className="px-6 py-3 w-40 whitespace-nowrap text-right text-sm font-medium">
      {children}
    </td>
  )
}
