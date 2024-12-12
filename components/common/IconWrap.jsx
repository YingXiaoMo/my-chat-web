import { cn } from '@/lib/utils'

export function IconWrap({ title, className, Icon, ...props }) {
	return (
		<div className='cursor-pointer' title={title} {...props}>
			<Icon className={cn('h-4 w-4 text-foreground hover:text-foreground/80', className)} />
		</div>
	)
}
