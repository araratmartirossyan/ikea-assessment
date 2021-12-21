import { FC } from 'react'
import { navigation } from '../data/navigation'
import { classNames } from '../utils/classNames'

type Props = {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export const Sidebar: FC<Props> = () => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/640px-Ikea_logo.svg.png"
              alt="Workflow"
            />
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map(item => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? 'text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
