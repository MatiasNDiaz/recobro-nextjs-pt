import { tenant_1, } from "../data/tenant_1";
import { tenant_2, } from "../data/tenant_2";
import { tenant_3, } from "../data/tenant_3";
import { tenant_4, } from "../data/tenant_4";

export const tenants = [
    tenant_1,
    tenant_2,
    tenant_3,
    tenant_4,
];  

export const getTenantByName = ( name: string | undefined )=> {
    if (!name || typeof name !== "string") return null;
    return tenants.find( tenant => tenant.name.toLocaleLowerCase() === name.toLocaleLowerCase());
}


// funcion de ejemplo para obtener un tenant por su id.
//  |_(es una demostración de organizacion si es que escala la aplicación)
export const getTenatById = ( id: number ) => {
    if (!id || typeof id !== "number") return null;
    return tenants.find( tenat => tenat.id === id);
}