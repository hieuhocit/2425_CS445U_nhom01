export class AnswerGlobal {
    id?: number
    question_id?: string
    content?: string
    isCorrect?: boolean
    option?: string
    created_at?: Date
    updated_at?: Date

    constructor(id?: number, question_id?: string, content?: string, isCorrect?: boolean, option?: string, created_at?: Date, updated_at?: Date) {
        this.id = id
        this.question_id = question_id
        this.content = content
        this.isCorrect = isCorrect
        this.option = option
        this.created_at = created_at
        this.updated_at = updated_at
    }
}