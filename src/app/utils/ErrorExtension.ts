export class ErrorExtension extends Error {
    status: number;

    constructor(status: number, message: string) { 
        super(message); // serve para chamar o construtor da superclasse
        this.status = status;
    }
}