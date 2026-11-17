import { generateUUID } from "#lib/functions/uuid.svelte.ts";

export class Potion {
    id: string;
    name: string;
    icon: string;
    duration: number = $state(0);
    progress: number = $state(0);
    effect: { addition: number, multiplier: number }

    percentage: string = $derived((this.progress / this.duration * 100).toFixed(2));
    remaining: string = $derived((this.duration - this.progress).toFixed(2));
    calculateEffect: string = $derived.by(() => {
        if(this.effect.addition != 0) return `+${this.effect.addition}`;
        if(this.effect.multiplier != 0) return `*${this.effect.multiplier}`;
        return `No effect?`;
    });

    constructor(name: string, icon: string, duration: number, effect: { addition: number, multiplier: number }) {
        this.id = generateUUID();
        this.name = name;
        this.icon = icon;
        this.duration = duration;
        this.effect = effect;
    }
}

// TODO change this into something more modular.
export function genericPotion() {
    return new Potion(
        'Generic Potion',
        'generic_potion',
        30,
        { addition: 5.0, multiplier: 1.0 }
    )
}

export function hyperPotion() {
    return new Potion(
        'Hyper Potion',
        'hyper_potion',
        15,
        { addition: 0, multiplier: 1.1 }
    )
}