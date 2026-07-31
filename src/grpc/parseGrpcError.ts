import {Errors} from './codes'
import {parseErrorDetail} from './errdetails'
import {ServiceError} from './serviceError'

export type GrpcError = {
    message: string
    code: number
    details?: unknown[]
}

export function parseGrpcError(e: unknown): ServiceError {
    if (e instanceof ServiceError) return e

    if (e instanceof Error && e.message === 'Failed to fetch') {
        return new ServiceError({title: 'Server unavailable. Try again later', isRetryable: true})
    }

    if (typeof e === 'object' && e !== null && 'code' in e) {
        const grpc = e as GrpcError
        const retryable = grpc.code === Errors.UNAVAILABLE || grpc.code === Errors.INTERNAL
        const details = (grpc.details ?? []).map(parseErrorDetail)
        return new ServiceError({title: grpc.message, isRetryable: retryable, grpcCode: grpc.code, details})
    }

    return new ServiceError({title: String(e), isRetryable: false})
}
