import firebase from 'firebase';

export default class AirAnnouncement {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }

        const message = dict.message || null;
        const officeUID = dict.officeUID || null;
        const userUID = dict.userUID || null;
        const timestamp = dict.timestamp || null;

        if (timestamp) {
            const seconds = timestamp._seconds;
            const nanoseconds = timestamp._nanoseconds;
            const firestamp =  new firebase.firestore.Timestamp(seconds, nanoseconds);
            this.timestamp = firestamp.toDate();
        }

        this.message = message;
        this.userUID = userUID;
        this.officeUID = officeUID;
        this.uid = uid;
    }
}
