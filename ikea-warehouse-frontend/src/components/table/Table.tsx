import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  header: ReactNode
}

export const Table: FC<Props> = ({ children, header }) => {
  return (
    <table className="min-w-full">
      <thead>{header}</thead>
      <tbody className="bg-white divide-y divide-gray-100">{children}</tbody>
    </table>
  )
}
