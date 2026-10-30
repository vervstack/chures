import {useId} from 'react'
import type {ReactNode} from 'react'
import cn from 'classnames'
import styles from './Accordion.module.css'
import {Button} from '../Button'
import {ChevronDownIcon} from '../icons'
import {useComponentClassName} from '../../theme/useComponentClassName'

interface Props {
    title: ReactNode
    meta?: ReactNode
    isOpen: boolean
    onToggle: (isOpen: boolean) => void
    children: ReactNode
    className?: string
}

export type AccordionProps = Props

export default function Accordion({title, meta, isOpen, onToggle, children, className}: Props) {
    const resolvedClassName = useComponentClassName('Accordion', className)
    const panelId = useId()

    function handleToggle() {
        onToggle(!isOpen)
    }

    return (
        <div className={cn(styles.AccordionContainer, {[styles.isOpen]: isOpen}, resolvedClassName)}>
            <Button
                variant="unstyled"
                className={styles.Header}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={handleToggle}>
                <span className={styles.Heading}>
                    <ChevronDownIcon className={styles.Chevron}/>
                    <span className={styles.Title}>{title}</span>
                </span>
                {meta != null && <span className={styles.Meta}>{meta}</span>}
            </Button>
            <div id={panelId} className={styles.Panel} aria-hidden={!isOpen}>
                <div className={styles.PanelContent}>{children}</div>
            </div>
        </div>
    )
}
