import cn from "classnames";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

import {Toast as ToastProps, useToaster} from "../../hooks/toaster/useToaster";
import {useComponentClassName} from "../../theme/useComponentClassName";
import cls from "./Toast.module.css";

interface Props {
    className?: string
}

export type ToasterProps = Props

export default function Toaster({className}: Props = {}) {
    const {toasts} = useToaster();
    const resolvedClassName = useComponentClassName('Toaster', className);

    return (
        <div className={cn(cls.ToastContainer, resolvedClassName)}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{opacity: 0, x: 100, y: 50}}
                        animate={{opacity: 1, x: 0, y: 0}}
                        exit={{opacity: 0, y: -50}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                    >
                        <Toast {...toast}/>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

function Toast({id, title, description, level, isDismissable}: ToastProps) {
    const [isLeaving, setIsLeaving] = useState(false);
    const toaster = useToaster();

    useEffect(() => {
        return () => {
            setIsLeaving(true);
        };
    }, []);

    return (
        <div
            className={cn(cls.Toast, {
                [cls.error]: level === 'Error',
                [cls.warn]: level === 'Warn',
                [cls.info]: level == undefined || level === 'Info',
                [cls.slideIn]: !isLeaving,
                [cls.slideOut]: isLeaving,
            })}
        >
            <div>{title}</div>
            <div className={cls.Description}>{description}</div>
            {isDismissable && id !== undefined && (
                <div className={cls.DismissButton} onClick={() => toaster.dismiss(id)}>
                    &times;
                </div>
            )}
        </div>
    );
}
