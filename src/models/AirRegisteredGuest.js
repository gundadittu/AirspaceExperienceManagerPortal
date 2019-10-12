import firebase from 'firebase';

export default class AirRegisteredGuest {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }
        
        const name = dict.guestName || null;
        const email = dict.guestEmail || null;
        const arrived = dict.arrived ? dict.arrived : false;
        const canceled = dict.canceled ? dict.canceld : false;
        const expectedVisitDate = dict.expectedVisitDate || null;
        const hostUID = dict.hostUID || null;
        const visitingOfficeUID = dict.visitingOfficeUID || null;
        const visitingCompanyUID = dict.visitingCompanyUID || null;

        this.uid = uid;
        this.name = name;
        this.email = email;
        this.arrived = arrived;
        this.canceled = canceled;

        if (expectedVisitDate) {
            const seconds = expectedVisitDate._seconds;
            const nanoseconds = expectedVisitDate._nanoseconds;
            const timestamp =  new firebase.firestore.Timestamp(seconds, nanoseconds);
            this.expectedVisitDate = timestamp.toDate();
        }

        this.hostUID = hostUID;
        this.visitingOfficeUID = visitingOfficeUID;
        this.visitingCompanyUID = visitingCompanyUID;
    }
}
