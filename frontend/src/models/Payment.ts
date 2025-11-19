export interface Payment {
    id: string,
    name: string,
    amount: number,
    status: string,
    reviewed: boolean,
    created_at: string,
    loading: boolean
}