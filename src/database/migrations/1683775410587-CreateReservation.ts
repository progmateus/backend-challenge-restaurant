import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReservation1683775410587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reservations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "client_id",
                        type: "uuid",

                    },
                    {
                        name: "table_spot",
                        type: "varchar"
                    },
                    {
                        name: "date",
                        type: "timestamp"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserReservation",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["client_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reservations")
    }

}
