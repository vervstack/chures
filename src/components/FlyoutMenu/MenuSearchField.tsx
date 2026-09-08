import {motion} from "framer-motion"

import {Input} from "../Input"
import {SearchIcon} from "../icons"
import styles from "./FlyoutMenu.module.css"

interface Props {
    value: string
    onChange: (v: string) => void
    placeholder?: string
}

const TRANSITION = {duration: 0.15, ease: [0.2, 0.7, 0.2, 1] as const}

// The search field a type-to-search menu grows above its list once the user
// starts typing (see useTypeToSearch). Autofocuses on mount so the keystroke
// that spawned it and every key after land here; Escape clears the query, which
// unmounts the field.
export function MenuSearchField({value, onChange, placeholder}: Props) {
    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Escape") onChange("")
    }

    return (
        <motion.div
            className={styles.MenuSearchFieldContainer}
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            transition={TRANSITION}
        >
            <Input
                value={value}
                setValue={onChange}
                placeholder={placeholder ?? "Search"}
                autoFocus
                onKeyDown={handleKeyDown}
                startIcon={<SearchIcon size={14}/>}
            />
        </motion.div>
    )
}

export type MenuSearchFieldProps = Props
