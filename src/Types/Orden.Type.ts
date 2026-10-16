export interface RegistrarOrdenRequestDto {
    rutCliente: string;
    tipoEquipo: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
    descripcionFalla: string;
    accesoriosEntregados: string;
}

export interface RegistrarOrdenResponseDto {
    id: number;
    numeroOrden: string;
    estado: string;
    nombreCliente: string;
    fechaRecepcion: string;
    messaje:string;
    succes:boolean;


}