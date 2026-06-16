import cn from 'classnames'
import { Loader, LoaderProps } from './Loader'
import styles from './LoadingWrapper.module.css'

interface Props {
    isLoading: boolean
    children: React.ReactNode
    skeleton?: React.ReactNode
    loaderProps?: LoaderProps
    className?: string
}

export type LoadingWrapperProps = Props

export function LoadingWrapper({ isLoading, children, skeleton, loaderProps, className }: Props) {
    if (!isLoading) return <>{children}</>
    if (skeleton) return <div className={cn(styles.SkeletonWrapper, className)}>{skeleton}</div>
    return (
        <div className={cn(styles.LoadingWrapperContainer, className)}>
            <Loader {...loaderProps} />
        </div>
    )
}
