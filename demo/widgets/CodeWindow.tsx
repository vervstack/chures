import cls from "./CodeWindow.module.css"

interface Props {
    title: string
    code: string
}

export function CodeWindow({ title, code }: Props) {
    return (
        <div className={cls.CodeWindow}>
            <div className={cls.TitleBar}>{title}</div>
            <pre className={cls.Code}><code>{code}</code></pre>
        </div>
    )
}
