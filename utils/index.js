import { toast } from 'sonner'

export * from './chat'
export * from './router'

export const isDev = process.env.NODE_ENV !== 'production'

export function showToast(message, type) {
	if (type === 'error') {
		toast.error(message)
	} else if (type === 'success') {
		toast.success(message)
	} else {
		toast(message)
	}
}

export function downloadImg(base64Str) {
	const a = document.createElement('a')
	a.href = base64Str
	a.download = `${Date.now()}.png`
	a.click()
}
