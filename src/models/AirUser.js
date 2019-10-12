import AirOffice from './AirOffice';

export default class AirUser { 
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) { 
            return null
        }
        const firstName = dict.firstName || null;
        const lastName = dict.lastName || null;
        const email = dict.email || null;
        const type = dict.type || null;
        const offices = dict.offices || null;
        const adminOffices = dict.officeAdmin || null;
        this.profileImageURL = dict.profileImageURL || null;
        this.uid = uid;
        this.name = firstName+" "+lastName;
        this.firstName = firstName; 
        this.lastName = lastName;
        this.email = email;
        this.type = type;

        var airOffices = [];
        for(let key in offices) { 
            const office = new AirOffice(offices[key]);
            if (office) { 
                airOffices.push(office);
            }
        }
        this.offices = airOffices;

        var airAdminOffices = [];
        for(let key in adminOffices) { 
            const office = new AirOffice(offices[key]);
            if (office) { 
                airAdminOffices.push(office);
            }
        }
        this.officeAdmins = airAdminOffices;
    }
}