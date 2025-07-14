import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { UserAvatar } from '@pc/components/Author/UserAvatar'
import { ConversationSidebar } from '@pc/components/Conversation/ConversationSidebar'

export function LayoutWithSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div
        className={`${
          collapsed ? 'w-10' : 'w-64'
        } border-r transition-all duration-300 flex flex-col overflow-y-scroll`}
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)'
        }}>
        <div
          className="flex justify-between items-center p-2 border-b"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}>
          {!collapsed && (
            <div className="flex items-center">
              <img src="/gpt.jpg" alt="GPT Logo" className="w-8 h-8" />
              <span className="ml-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                AI Chat
              </span>
            </div>
          )}
          <div className="flex items-center">
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setCollapsed(false)}
                className="cursor-pointer hover:text-gray-800"
                style={{ color: 'var(--color-text-secondary)' }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setCollapsed(true)}
                className="cursor-pointer hover:text-gray-800"
                style={{ color: 'var(--color-text-secondary)' }}
              />
            )}
          </div>
        </div>
        {!collapsed && <ConversationSidebar />}
      </div>
      <div
        className="flex-1 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="absolute top-0 right-0 p-4 z-10">
          <UserAvatar />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
