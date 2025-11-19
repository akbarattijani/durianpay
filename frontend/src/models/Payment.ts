export interface Payment {
    id: string,
    amount: number,
    status: string,
    reviewed: boolean,
    created_at: string,
    loading: boolean
}