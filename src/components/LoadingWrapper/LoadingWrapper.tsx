import cn from 'classnames'
import { Loader, LoaderProps } from '../Loader'
import styles from './LoadingWrapper.module.css'
import { useComponentClassName } from '../../theme/useComponentClassName'

interface Props {
    isLoading: boolean
    children: React.ReactNode
    skeleton?: React.ReactNode
    loaderProps?: LoaderProps
    className?: string
}

export type LoadingWrapperProps = Props

export function LoadingWrapper({ isLoading, children, skeleton, loaderProps, className }: Props) {
    const resolvedClassName = useComponentClassName('LoadingWrapper', className)
    if (!isLoading) return <>{children}</>
    if (skeleton) return <div className={cn(styles.SkeletonWrapper, resolvedClassName)}>{skeleton}</div>
    return (
        <div className={cn(styles.LoadingWrapperContainer, resolvedClassName)}>
            <Loader {...loaderProps} />
        </div>
    )
}
