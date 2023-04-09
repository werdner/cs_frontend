class BitGetter {
    #theArray: Uint8Array

    constructor(array: Uint8Array) {
        this.#theArray = array
    }

    #assertValidation(index: number, bitPosition: number) {
        switch (true) {
            case index < 0 || index > this.#theArray.length:
                throw new Error('Index is out of range')
            case bitPosition < 0 || bitPosition >= this.#theArray.BYTES_PER_ELEMENT * 8:
                throw new Error('Invalid bit position')
                default:
            return true
        }
    }

    public get(index: number, bitPosition: number): number {
        this.#assertValidation(index, bitPosition)
        
        const bit = this.#theArray[index]
        return (bit & (1 << bitPosition)) === 0 ? 0 : 1
    }

    public set(index: number, bitPosition: number, value: number): void {
        this.#assertValidation(index, bitPosition)

        if (value === 0) {
            this.#theArray[index] = this.#theArray[index] & ~(1 << bitPosition)
        } else {
            this.#theArray[index] = this.#theArray[index] | (1 << bitPosition)
        }
    }
}

export function createBitGetter(array: Uint8Array): BitGetter {
    return new BitGetter(array)
}