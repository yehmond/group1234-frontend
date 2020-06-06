import { Guid } from "guid-typescript";
import { DEFAULT_FROM, DEFAULT_TO } from "./constants";

export interface Barbershop {
    id: string;
    name: string;
    address: string;
    city: string;
    province: string;
    description: string;
    servicesOffered: string[];
    // price as a scale from 1-4
    price: number;
    website: string;
    phoneNumber: string;
    photos: File[];
    // weekdays index from 0-6, beginning on Monday
    hours: Day[];
}

export interface Day {
    isOpen: boolean;
    from: string;
    to: string;
}

export function initializeHours(): Day[] {
    let hours: Day[] = [];
    for (let i = 0; i < 7; i++) {
        hours.push({ isOpen: true, from: DEFAULT_FROM, to: DEFAULT_TO });
    }
    return hours;
}

export function initializeBarbershop(): Barbershop {
    // TODO placeholder
    return {
        id: Guid.create().toString(),
        name: "Name",
        address: "123456 Address",
        city: "Vancouver",
        province: "BC",
        website: "www.website.com",
        phoneNumber: "7781234567",
        description: "This is a description",
        hours: initializeHours(),
        price: 0,
        photos: [],
        servicesOffered: [],
    };
}
