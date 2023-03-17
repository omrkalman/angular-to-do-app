export default class Task {
    id = Date.now();
    text: string;
    isCompleted = false;
    dueBy?: number;
    completedAt? : number;
    constructor();
    constructor(text?: string, dueBy?: number) {
        this.text = text || '';
        this.dueBy = dueBy;
    }
}
