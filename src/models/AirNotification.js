import { getAirNotificationTypeFor } from './AirNotificationType';
import firebase from 'firebase';

export default class AirNotification {
    constructor(dict) {
        this.uid = dict.uid || null;
        if (this.uid == null) {
            return null
        }
        this.title = dict.title || null;
        this.body = dict.body || null;
        const type = getAirNotificationTypeFor(dict.type);
        if (type == null) {
            return null
        }
        this.type = type;

        const timeStampDict = dict.timestamp;
        const seconds = timeStampDict._seconds;
        const nanoseconds = timeStampDict._nanoseconds;
        const timestamp =  new firebase.firestore.Timestamp(seconds, nanoseconds);
        this.date = timestamp.toDate();
    }
}
