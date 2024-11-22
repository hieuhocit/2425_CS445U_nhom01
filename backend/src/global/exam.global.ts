export class ExamGlobal {
    id?: number
    title?: string
    user_id?: number
    created_at?: Date
    updated_at?: Date

    constructor(id: number, title: string, user_id: number, created_at: Date, updated_at: Date) {
        this.id = id;
        this.title = title
        this.user_id = user_id;
        this.created_at = created_at
        this.updated_at = updated_at
    }
}