interface AddOrderRequestBody {
    'receiver'?: string
    'email'?: string
    'phone'?: string
    'street'?: string
    'building'?: string
    'room'?: string
    'comment'?: string
    'properties'?: {
        'extfld_address'?: string
        'extfld_persons'?: string
        'extfld_summ'?: string
        'extfld_floor'?: string
    }
    'delivery'?: number
    'payment'?: number
    'products'?: {
        id: string,
        count: string
    }[]
}

export default AddOrderRequestBody