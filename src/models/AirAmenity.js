var AirAmenityType = {
    whiteBoard: 'White Board',
    videoConferencing: 'Video Conferencing',
    screenSharing: 'Screen Sharing',
    conferencePhone: 'Conference Phone',
    inputSwitchingEnabled: 'Input Switching Enabled',
    microphone: 'Microphone',
    adapters: 'Adapters',
    builtInComputer: 'Built-in Computer',
    hdmiCables: 'HDMI Cables',
    powerStrip: 'Power Strip',
    speakers: 'Speakers',
    projector: 'Projector',
    smartTV: 'Smart TV',
    largeMonitor: 'Large Monitor'
}

export default class AirAmenity {

    constructor(type) {
        let title = null;
        for (let key in AirAmenityType) {
            if (key === type) {
                const value = AirAmenityType[key];
                title = value;
                break;
            }
        }
        if (title === null) {
            return null
        }
        this.type = type;
        this.title = title;
        return
    }
}

// var AirAmenityType = {
//     FURNITURE_REPAIR: 'furnitureRepair',
//     BROKEN_FIXTURES: 'brokenFixtures',
//     LIGHTS_NOT_WORKING: 'lightsNotWorking',
//     WATER_DAMAGE_LEAK: 'waterDamageLeak',
//     BROKEN_AC_HEATING: 'brokenACHeating',
//     KITCHEN_ISSUES: 'kitchenIssues',
//     BATHROOM_ISSUES: 'bathroomIssues',
//     DAMAGED_DYING_PLANTS: 'damagedDyingPlants',
//     CONFERENCE_ROOM_HARDWARE: 'conferenceRoomHardware',
//     WEB_MOBILE_APP_ISSUES: 'webMobileIssues',
//     FURNITURE_MOVING_REQUEST: 'furnitureMovingRequest',
//     PRINTING_ISSUES: 'printingIssues',
//     WIFI_ISSUES: 'wifiIssues',
//     OTHER: 'other'
// }
