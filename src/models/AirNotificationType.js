export const AirNotificationType  = {
    serviceRequestUpdate: "serviceRequestUpdate", 
    arrivedGuestUpdate: "arrivedGuestUpdate", 
    newEvent: "newEvent", 
    announcement: "announcement",
    none: 'none'
}

export function getAirNotificationTypeFor(string) { 
    switch (string) { 
        case AirNotificationType.announcement: 
            return AirNotificationType.announcement
        case AirNotificationType.arrivedGuestUpdate: 
            return AirNotificationType.arrivedGuestUpdate
        case AirNotificationType.newEvent: 
            return AirNotificationType.newEvent
        case AirNotificationType.serviceRequestUpdate: 
            return AirNotificationType.serviceRequestUpdate
        default:
            return null;
    }
} 
