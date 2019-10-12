var AirServiceRequestType = {
    infoTech: {
      rawValue: 'infoTech',
      title: 'IT'
    },
    plumbing: {
      rawValue: 'plumbing',
      title: 'Plumbing'
    },
    lighting: {
      rawValue: 'lighting',
      title: 'Lighting'
    },
    generalMaintenance: {
      rawValue: 'generalMaintenance',
      title: 'General Maintenance'
    },
    furniture: {
      rawValue: 'furniture',
      title: 'Furniture'
    },
    door: {
      rawValue: 'door',
      title: 'Door'
    },
    heatingCooling: {
      rawValue: 'heatingCooling',
      title: 'Heating/Cooling'
    },
    cleaning: {
      rawValue: 'cleaning',
      title: 'Cleaning'
    },
    supplies: {
      rawValue: 'supplies',
      title: 'Supplies'
    },
    other: {
      rawValue: 'other',
      title: 'Other'
    }
}

export default class AirServiceType {

    constructor(type) {
      if (type === null) { 
        return null
      }
        this.type = type;
        this.title = AirServiceRequestType[type];
        return
    }
}
