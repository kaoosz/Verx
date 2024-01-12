
export function requiredMessage(field:any){
    return `o campo ${field} é obrigatorio`
}

export function invalidTypeMessage(field:any, type:any) {
    return `O campo ${field} é do tipo ${type}.`
}

export function invalidUUIDTypeMessage(field:string){
    return `O campo ${field} é um UUID tipo string.`;
}