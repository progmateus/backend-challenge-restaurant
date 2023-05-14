interface ICreateReservationDTO {
    id?: string;
    client_id: string;
    table_spot: string;
    date: Date;
    created_at?: Date
    updated_at?: Date
}
export { ICreateReservationDTO };