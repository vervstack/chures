import {describe, expect, it} from 'vitest'
import {Errors} from './codes'
import {isBadRequest, isErrorInfo} from './errdetails'
import {parseGrpcError} from './parseGrpcError'
import {ServiceError} from './serviceError'

describe('parseGrpcError', () => {
    it('maps a fetch-network failure to a retryable "server unavailable" error', () => {
        const err = parseGrpcError(new Error('Failed to fetch'))

        expect(err).toBeInstanceOf(ServiceError)
        expect(err.message).toBe('Server unavailable. Try again later')
        expect(err.isRetryable).toBe(true)
        expect(err.grpcCode).toBeUndefined()
        expect(err.details).toEqual([])
    })

    it('falls back to String(e) for an unrelated Error', () => {
        const original = new Error('boom')
        const err = parseGrpcError(original)

        expect(err.message).toBe(String(original))
        expect(err.isRetryable).toBe(false)
        expect(err.details).toEqual([])
    })

    it('falls back to String(e) for a plain string', () => {
        const err = parseGrpcError('oops')

        expect(err.message).toBe('oops')
        expect(err.isRetryable).toBe(false)
    })

    it('falls back to String(e) for an unknown value', () => {
        const err = parseGrpcError(undefined)

        expect(err.message).toBe(String(undefined))
        expect(err.isRetryable).toBe(false)
    })

    it('parses a GrpcError with only code+message, retryable for UNAVAILABLE', () => {
        const err = parseGrpcError({message: 'service down', code: Errors.UNAVAILABLE})

        expect(err.message).toBe('service down')
        expect(err.grpcCode).toBe(Errors.UNAVAILABLE)
        expect(err.isRetryable).toBe(true)
        expect(err.details).toEqual([])
    })

    it('parses a GrpcError with only code+message, retryable for INTERNAL', () => {
        const err = parseGrpcError({message: 'internal error', code: Errors.INTERNAL})

        expect(err.grpcCode).toBe(Errors.INTERNAL)
        expect(err.isRetryable).toBe(true)
    })

    it('parses a GrpcError with only code+message, not retryable for NOT_FOUND', () => {
        const err = parseGrpcError({message: 'missing', code: Errors.NOT_FOUND})

        expect(err.grpcCode).toBe(Errors.NOT_FOUND)
        expect(err.isRetryable).toBe(false)
        expect(err.details).toEqual([])
    })

    it('parses details into typed ErrorInfo and BadRequest shapes', () => {
        const err = parseGrpcError({
            message: 'invalid argument',
            code: Errors.INVALID_ARGUMENT,
            details: [
                {
                    '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
                    reason: 'FIELD_REQUIRED',
                    domain: 'velez.vervstack.ru',
                    metadata: {field: 'name'},
                },
                {
                    '@type': 'type.googleapis.com/google.rpc.BadRequest',
                    fieldViolations: [{field: 'name', description: 'must not be empty'}],
                },
            ],
        })

        expect(err.details).toHaveLength(2)

        const errorInfo = err.details.find(isErrorInfo)
        expect(errorInfo).toBeDefined()
        expect(errorInfo?.reason).toBe('FIELD_REQUIRED')
        expect(errorInfo?.domain).toBe('velez.vervstack.ru')
        expect(errorInfo?.metadata).toEqual({field: 'name'})

        const badRequest = err.details.find(isBadRequest)
        expect(badRequest).toBeDefined()
        expect(badRequest?.fieldViolations).toEqual([{field: 'name', description: 'must not be empty'}])
    })

    it('falls back to the unknown-detail shape for an unrecognized @type without throwing', () => {
        const err = parseGrpcError({
            message: 'weird error',
            code: Errors.UNKNOWN,
            details: [{'@type': 'type.googleapis.com/some.other.Thing', foo: 'bar'}],
        })

        expect(err.details).toHaveLength(1)
        expect(err.details[0].kind).toBe('Unknown')
        if (err.details[0].kind === 'Unknown') {
            expect(err.details[0].typeUrl).toBe('type.googleapis.com/some.other.Thing')
            expect(err.details[0].raw).toEqual({'@type': 'type.googleapis.com/some.other.Thing', foo: 'bar'})
        }
    })

    it('returns an already-ServiceError input as-is', () => {
        const original = new ServiceError({title: 'already parsed', isRetryable: true})
        const err = parseGrpcError(original)

        expect(err).toBe(original)
    })
})
