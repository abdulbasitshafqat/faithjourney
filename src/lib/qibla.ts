export function calculateQibla(latitude: number, longitude: number): number {
    const KAABA_LAT = 21.422487;
    const KAABA_LONG = 39.826206;

    const phi1 = (latitude * Math.PI) / 180;
    const phi2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLambda = ((KAABA_LONG - longitude) * Math.PI) / 180;

    const y = Math.sin(deltaLambda) * Math.cos(phi2);
    const x =
        Math.cos(phi1) * Math.sin(phi2) -
        Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

    const qibla = (Math.atan2(y, x) * 180) / Math.PI;
    return (qibla + 360) % 360;
}
