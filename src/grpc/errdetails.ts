export const ERROR_INFO_TYPE_URL = 'type.googleapis.com/google.rpc.ErrorInfo'
export const BAD_REQUEST_TYPE_URL = 'type.googleapis.com/google.rpc.BadRequest'
export const PRECONDITION_FAILURE_TYPE_URL = 'type.googleapis.com/google.rpc.PreconditionFailure'

export type GrpcErrorInfo = {
    kind: 'ErrorInfo'
    reason: string
    domain: string
    metadata: Record<string, string>
}

export type GrpcBadRequestFieldViolation = {
    field: string
    description: string
}

export type GrpcBadRequest = {
    kind: 'BadRequest'
    fieldViolations: GrpcBadRequestFieldViolation[]
}

export type GrpcPreconditionFailureViolation = {
    type: string
    subject: string
    description: string
}

export type GrpcPreconditionFailure = {
    kind: 'PreconditionFailure'
    violations: GrpcPreconditionFailureViolation[]
}

export type GrpcUnknownErrorDetail = {
    kind: 'Unknown'
    typeUrl: string
    raw: unknown
}

export type GrpcErrorDetail = GrpcErrorInfo | GrpcBadRequest | GrpcPreconditionFailure | GrpcUnknownErrorDetail

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value : ''
}

export function parseErrorDetail(raw: unknown): GrpcErrorDetail {
    if (!isRecord(raw)) {
        return {kind: 'Unknown', typeUrl: '', raw}
    }

    const typeUrl = asString(raw['@type'])

    switch (typeUrl) {
        case ERROR_INFO_TYPE_URL: {
            const metadataRaw = isRecord(raw.metadata) ? raw.metadata : {}
            const metadata: Record<string, string> = {}
            for (const key of Object.keys(metadataRaw)) {
                metadata[key] = asString(metadataRaw[key])
            }
            return {
                kind: 'ErrorInfo',
                reason: asString(raw.reason),
                domain: asString(raw.domain),
                metadata,
            }
        }
        case BAD_REQUEST_TYPE_URL: {
            const fieldViolationsRaw = Array.isArray(raw.fieldViolations) ? raw.fieldViolations : []
            const fieldViolations: GrpcBadRequestFieldViolation[] = fieldViolationsRaw.map((v: unknown) => {
                const violation = isRecord(v) ? v : {}
                return {
                    field: asString(violation.field),
                    description: asString(violation.description),
                }
            })
            return {kind: 'BadRequest', fieldViolations}
        }
        case PRECONDITION_FAILURE_TYPE_URL: {
            const violationsRaw = Array.isArray(raw.violations) ? raw.violations : []
            const violations: GrpcPreconditionFailureViolation[] = violationsRaw.map((v: unknown) => {
                const violation = isRecord(v) ? v : {}
                return {
                    type: asString(violation.type),
                    subject: asString(violation.subject),
                    description: asString(violation.description),
                }
            })
            return {kind: 'PreconditionFailure', violations}
        }
        default:
            return {kind: 'Unknown', typeUrl, raw}
    }
}

export function isErrorInfo(detail: GrpcErrorDetail): detail is GrpcErrorInfo {
    return detail.kind === 'ErrorInfo'
}

export function isBadRequest(detail: GrpcErrorDetail): detail is GrpcBadRequest {
    return detail.kind === 'BadRequest'
}

export function isPreconditionFailure(detail: GrpcErrorDetail): detail is GrpcPreconditionFailure {
    return detail.kind === 'PreconditionFailure'
}
