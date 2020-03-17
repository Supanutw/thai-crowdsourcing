export class airqualitymodel {
    public aqi?: any;
    public idx?: any;
    public city?: citymodel;
    public pollution?: pollutionmodel;
    public time?: any;
    public iaqi?:iaqimodel;
}

export class citymodel {
    public geo?: geomodel;
    public name?: any = '';
    public url?: any;
}

export class geomodel {
    public lat?: any;
    public long?: any;
}

export class pollutionmodel {
    public aqi?: any;
    public pollutionlevelEN?: any;
    public pollutionlevelTH?: any;
    public color?: any;
}

export class iaqimodel {
    public pm10?:any = 0;
    public o3?:any;
}