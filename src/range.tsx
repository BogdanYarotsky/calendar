export function range(stop: number): number[];
export function range(start: number, stop: number): number[]
export function range(startOrStop: number, stop?: number): number[] {
    if (stop) {
        return Array.from({ length: stop - startOrStop }, (_, i) => i + startOrStop);
    }

    return Array.from({ length: startOrStop }, (_, i) => i);
}
