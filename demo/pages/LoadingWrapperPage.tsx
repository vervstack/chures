import { useState } from "react"
import { LoadingWrapper } from "../../src/components/LoadingWrapper"
import { LoaderProps } from "../../src/components/Loader"
import { PropRow, Switch, ToggleGroup } from "../components/PropRow"

const VARIANTS = ["arcs", "ripple", "dots", "wave"] as const

function UserCard() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div
                    style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "50%",
                        background: "rgba(34,158,217,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "1.375rem",
                    }}
                >
                    👤
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Alex Bukov</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>@alexbukov</span>
                </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Building tools for developers. Obsessed with clean APIs and great DX.
            </p>
        </div>
    )
}

function UserCardSkeleton() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div className="skeleton-bone" style={{ width: "3rem", height: "3rem", borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <div className="skeleton-bone" style={{ height: "0.875rem", width: "55%" }} />
                    <div className="skeleton-bone" style={{ height: "0.75rem", width: "35%" }} />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div className="skeleton-bone" style={{ height: "0.8125rem", width: "100%" }} />
                <div className="skeleton-bone" style={{ height: "0.8125rem", width: "65%" }} />
            </div>
        </div>
    )
}

export function LoadingWrapperPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [useSkeleton, setUseSkeleton] = useState(true)
    const [skeletonClass, setSkeletonClass] = useState("")
    const [variant, setVariant] = useState<NonNullable<LoaderProps["variant"]>>("arcs")
    const [size, setSize] = useState<NonNullable<LoaderProps["size"]>>("md")

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    <LoadingWrapper
                        isLoading={isLoading}
                        skeleton={useSkeleton ? <UserCardSkeleton /> : undefined}
                        loaderProps={{ variant, size }}
                        className={skeletonClass || undefined}
                    >
                        <UserCard />
                    </LoadingWrapper>
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading">Props</div>

                <PropRow label="isLoading">
                    <Switch checked={isLoading} onChange={setIsLoading} />
                </PropRow>

                <PropRow label="useSkeleton">
                    <Switch checked={useSkeleton} onChange={setUseSkeleton} />
                </PropRow>

                {useSkeleton && (
                    <PropRow label="className">
                        <input
                            type="text"
                            className="prop-input"
                            value={skeletonClass}
                            onChange={(e) => setSkeletonClass(e.target.value)}
                            placeholder="CSS class for skeleton wrapper"
                            style={{ width: "14rem" }}
                        />
                    </PropRow>
                )}

                {!useSkeleton && (
                    <>
                        <PropRow label="variant">
                            <ToggleGroup
                                options={[...VARIANTS]}
                                value={variant}
                                onChange={(v) => setVariant(v as NonNullable<LoaderProps["variant"]>)}
                            />
                        </PropRow>
                        <PropRow label="size">
                            <ToggleGroup
                                options={["sm", "md", "lg"]}
                                value={size}
                                onChange={(v) => setSize(v as NonNullable<LoaderProps["size"]>)}
                            />
                        </PropRow>
                    </>
                )}
            </div>
        </div>
    )
}
