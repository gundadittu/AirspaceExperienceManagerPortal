export default class AirOffice { 
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) { 
            return null
        }
        
        const name = dict.name || null;
        const building = dict.building || null;
        const floor = dict.floor || null;
        const roomNo = dict.roomNo || null;
        
        this.uid = uid;
        this.name = name;
        this.building = building;
        this.floorNo = floor;
        this.roomNo = roomNo;
    }
}