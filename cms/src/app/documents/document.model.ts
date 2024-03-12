export class Document {
    constructor(
        public id: string
        , public name: string
        , public description: string|null
        , public url: string
        , public children: []|null
        ) {} 
}