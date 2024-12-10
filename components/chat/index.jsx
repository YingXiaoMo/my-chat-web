'use client'

import { useEffect, useRef } from 'react'

import { ChatBottom } from './chat-bottombar'
import { ChatList } from './chat-list'
import { ChatMessage } from './chat-message'
import { ChatScroll } from './chat-scroll'
import { ChatTop } from './chat-topbar'
import { ChatTypeEnum } from '@/utils'
import { useChat } from '@/hooks/useChat'
import { useListScroll } from '@/hooks/useListScroll'
import { useModel } from '@/hooks/useModel'
import { useSidebarClose } from '@/hooks/useSidebarClose'

export function Chat({ type }) {
	const isChat = type === ChatTypeEnum.chat
	const chatRef = useRef(null)

	useModel()
	useSidebarClose() // 确保进入页面 关闭侧边栏
	const { showScroll, onScroll } = useListScroll(chatRef)
	const { apiLoading, messages } = useChat(type)

	useEffect(() => {
		onScroll()
		// eslint-disable-next-line
	}, [messages])

	return (
		<div className='w-full h-[calc(100vh-64px)] relative bg-background max-w-screen-md mx-auto flex flex-col z-10'>
			<ChatTop type={type} />
			<ChatList ref={chatRef}>
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
				{/* 聊天是流式的 content是动态的 */}
				{apiLoading && !isChat && (
					<ChatMessage message={{ role: 'assistant', pending: true, content: '正在生成中...' }} />
				)}
			</ChatList>
			{showScroll && messages.length > 0 && <ChatScroll onScroll={onScroll} />}
			<ChatBottom type={type} />
		</div>
	)
}
