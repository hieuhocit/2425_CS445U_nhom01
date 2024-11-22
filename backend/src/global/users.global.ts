export class UserGlobal {
    id?: number
    userName?: string
    password?: string
    fullName?: string
    email?: string
    phone_number?: string
    birthday?: string
    verify_email?: string
    role_id?: string
    history_id?: string
    created_at?: Date
    updated_at?: Date

    constructor(id: number, userName: string, password: string, fullName: string, email: string, phone_number: string, birthday: string, verify_email: string, role_id: string, history_id: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.userName = userName
        this.password = password
        this.fullName = fullName
        this.email = email
        this.birthday = birthday
        this.phone_number = phone_number
        this.verify_email = verify_email
        this.role_id = role_id
        this.history_id = history_id
        this.created_at = created_at
        this.updated_at = updated_at
    }
}