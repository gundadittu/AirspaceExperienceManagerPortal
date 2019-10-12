import AirOffice from './AirOffice';
import firebase from 'firebase';

export default class AirEvent  {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }

        const title = dict.title || null;
        const offices = dict.offices || null;
        const startDate = dict.startDate || null;
        const endDate = dict.endDate || null;
        const address = dict.address || null;
        const canceled = dict.canceled || null;
        const description = dict.description || null;
        const imageURL = dict.imageURL || null;

        this.uid = uid;
        this.title = title;
        var airOffices = [];
        for(let key in offices) {
            const office = new AirOffice(offices[key]);
            if (office) {
                airOffices.push(office);
            }
        }
        const seconds = startDate._seconds;
        const nanoseconds = startDate._nanoseconds;
        const timestamp =  new firebase.firestore.Timestamp(seconds, nanoseconds);
        this.startDate = timestamp.toDate();

        const endSeconds = endDate._seconds;
        const endNanoseconds = endDate._nanoseconds;
        const endTimestamp =  new firebase.firestore.Timestamp(endSeconds, endNanoseconds);
        this.endDate = endTimestamp.toDate();

        this.offices = airOffices;
        this.address = address;
        this.canceled = canceled;
        this.description = description;
        this.imageURL = imageURL
    }
}
