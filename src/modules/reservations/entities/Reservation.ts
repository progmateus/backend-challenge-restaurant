import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../accounts/entities/User";


@Entity("reservations")
class Reservation {
    @PrimaryColumn()
    id: string;

    @OneToMany(type => User, (user) => user)
    client: User

    @Column()
    client_id: string;

    @Column()
    date: Date;

    @Column()
    table_spot: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}
export { Reservation };