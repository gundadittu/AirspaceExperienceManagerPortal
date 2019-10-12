import AirOffice from './AirOffice';
import AirServiceType from './AirServiceType'
import firebase from 'firebase';

export default class AirServiceRequest {
    constructor(dict) {

        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }
        const canceled = dict.canceled;
        const issueType = dict.issueType || null;
        const status = dict.status || null;
        const note = dict.note || null;
        const officeUID = dict.officeUID || null;
        const userUID = dict.userUID || null;
        const timestamp = dict.timestamp || null;

        this.uid = uid;
        this.canceled = canceled;

        if (timestamp) {
            const seconds = timestamp._seconds;
            const nanoseconds = timestamp._nanoseconds;
            const firestamp =  new firebase.firestore.Timestamp(seconds, nanoseconds);
            this.timestamp = firestamp.toDate();
        }

        this.issueType = new AirServiceType(issueType);
        this.note = note;
        this.officeUID = officeUID;
        this.status = status
        this.userUID = userUID;
    }
}
