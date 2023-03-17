export default class Task {
    id = Date.now()+Math.random();
    text: string;
    isCompleted = false;
    dueBy?: number;
    completedAt? : number;

    constructor(text?: string, dueBy?: Date | number) {
        this.text = text || '';
        if (typeof dueBy === 'number') this.dueBy = dueBy;
        else this.dueBy = dueBy?.getTime();
    }
    
}
