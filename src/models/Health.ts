export class Health {
    private health: number;
    
    constructor(health: number) {
        if (!Number.isSafeInteger(health) || health < 0) {
            throw new RangeError('Health must be a non-negative safe integer.');
        }
        this.health = health;
    }

    adjustHealth(amount: number): void {
        if (!Number.isSafeInteger(amount)) {
            throw new RangeError('Health adjustment amount must be a safe integer.');
        }
        const newHealth = this.health + amount;
        if (newHealth < 0) {
            throw new RangeError('Health cannot be negative.');
        }
        this.health = newHealth;
    }

    get currentHealth(): number {
        return this.health;
    }
}