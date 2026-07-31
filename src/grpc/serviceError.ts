import type {GrpcErrorDetail} from './errdetails'

export class ServiceError extends Error {
    readonly isRetryable: boolean
    readonly grpcCode?: number
    readonly details: GrpcErrorDetail[]

    constructor(opts: {title: string; isRetryable?: boolean; grpcCode?: number; details?: GrpcErrorDetail[]}) {
        super(opts.title)
        this.isRetryable = opts.isRetryable ?? false
        this.grpcCode = opts.grpcCode
        this.details = opts.details ?? []
    }
}
