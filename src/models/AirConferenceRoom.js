import AirOffice from './AirOffice';
import AirAmenity from './AirAmenity';

export default class AirConferenceRoom {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }
        const name = dict.name || null;
        const offices = dict.offices || null;
        const amenitiesRaw = dict.amenities || null;
        const capacity = dict.capacity || null;
        const address = dict.address || null;
        const active = dict.active || null;
        const reserveable = dict.reserveable || null;
        const imageURL = dict.imageURL || null;

        this.uid = uid;
        this.name = name;
        var airOffices = [];
        for(let key in offices) {
            const office = new AirOffice(offices[key]);
            if (office) {
                airOffices.push(office);
            }
        }
        this.offices = airOffices;

        let amenities = [];
        for (let key in amenitiesRaw) { 
            const value = amenitiesRaw[key];
            const amenityObj = new AirAmenity(value); 
            if (amenityObj !== null) { 
                amenities.push(amenityObj);
            }
        }
        this.amenities = amenities;
        this.capacity = capacity;
        this.address = address;
        this.active = active;
        this.reserveable = reserveable;
        this.imageURL = imageURL
    }
}
