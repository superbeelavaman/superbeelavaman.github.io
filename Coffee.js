class coffee() {
    constructor() {
        this.empty = true
    }

    refill() {
        console.log("Refilled " + this.toString())
        this.empty = false
    }
    
    drink() {
        console.log("Drank " + this.toString())
        this.empty = true
    }
}
