export interface LatLng{
    lat: number;
    lng: number;
}
export interface Area {
    id?: number;
    name: string;
    shippingFee: number;
    polygon: LatLng[];
}