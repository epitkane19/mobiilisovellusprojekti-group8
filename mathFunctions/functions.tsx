


export function laskeAvgNopeus(t0: number, t1:number, x0: number, x1:number):number // yksiköt ovat sekunteja ja metrejä
{
    return Number(((x1 - x0) / (t1 - t0)).toFixed(2))
}

export function laskeLenkinKalorit(painoKilogrammoina:number, Minuutit:number, keskinopeusMPS:number,):number
{
    let MET:number = 0 //metabolic equivalent of a task, tää on kerroin mikä vastaa suorituksen kuormittavuutta.
    const keskinopeusKMH:number = (keskinopeusMPS/0.27778)
    const hidasNopeus:number = 7 //kilometriä per tunti
    const suuriNopeus:number = 12 //kilometriä per tunti

    if(keskinopeusKMH < hidasNopeus)
        {
            MET = 7 //kevyt lenkki
            console.log("kevyt, " +keskinopeusKMH)
        }
    else if(keskinopeusKMH >= hidasNopeus && keskinopeusKMH <= suuriNopeus)
        {
            MET = 10 //kohtainen lenkki
            console.log("kohtalainen, " +keskinopeusKMH)
        }
    else
        {
            MET = 12 //nopealenkki
            console.log("rankka, " +keskinopeusKMH)
        }

        return Number((painoKilogrammoina * (MET/60) * Minuutit).toFixed(2))
}
export function laskeJuoksujenAvgMatka(juoksut:number[]):number // ottaa parametriksi taulukon juoksuista, voi olla esim 3 päivän juoksut tai 7 päivän juoksut joista sit lasketaan avg.
{
    let avgMatkaKilometrit:number = 0
    let kumulatiivinenMatka:number = 0
    for(let iteraatiot = 0; iteraatiot < juoksut.length; iteraatiot++)
        {
            kumulatiivinenMatka += juoksut[iteraatiot]

            avgMatkaKilometrit = (kumulatiivinenMatka / iteraatiot)
            console.log(kumulatiivinenMatka)
        }
        return Number(avgMatkaKilometrit.toFixed(2)) //palautetaan matka kilometreinä
}

type coordlist =
{
    "lat": number
    "lng": number
}
export function laskeKoordinaatitKilometreiksi(coordList:coordlist[]):number
{
    const MaanRadius:number = 6371
    let kokonaisMatka = 0 
    const rad = 0.0174533
    console.log("koodrilista: " +coordList)

    if(coordList.length < 1 ) return 0 //error check, pistetään palauttamaan 0, jos liian lyhyt lista

    for(let iteration = 0; iteration < 1; iteration++)
    {
        let lat1 = coordList[iteration].lat
        let lng1 = coordList[iteration].lng

        let lat2 = coordList[iteration+1].lat
        let lng2 = coordList[iteration+1].lng

        console.log("lat1:", lat1)
        console.log("lng1:", lng2)
        console.log("lat2:", lat2)
         console.log("lng2:", lng2)

        //let laskettuMatka = 2 * MaanRadius * Math.asin(Math.sqrt((Math.pow(Math.sin(((lat2 - lat1) / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(((lng2 - lng1) / 2), 2)), 2) / 2)))
        let laskettuMatka = 2 * MaanRadius * Math.asin(Math.sqrt(Math.pow(Math.sin(((lat2*rad - lat1*rad) / 2)), 2) + Math.cos(lat1*rad) * Math.cos(lat2*rad) * Math.pow(Math.sin(lng2*rad - lng1*rad), 2) / 2))
        console.log("LASKETTUMATKA: "+laskettuMatka)

        kokonaisMatka += laskettuMatka

    }

    return kokonaisMatka
}
