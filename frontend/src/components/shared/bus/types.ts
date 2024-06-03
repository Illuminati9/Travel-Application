// types.ts
export interface Bus {
  _id: string;
  name: string;
  number: string;
  seatCapacity: number;
  seats: unknown[];
  sourceStop: Stop;
  destinationStop: Stop;
  stops: unknown[];
  parkingAddress: Address;
  staffId: unknown[];
  ownerId: string | null;
  busDetails: BusDetails;
  __v: number;
}

export interface Stop {
  _id: string;
  stopName: string;
  stopAddress: string;
  city: string;
  pincode: number;
  __v: number;
}

export interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  __v: number;
}

export interface BusDetails {
  _id: string;
  busType: string;
  capacity: number;
  certificates: string[];
  fuelType: string;
  fuelCapacity: string;
  __v: number;
  busId: string;
}

export interface Owner {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  accountType: string;
  booking: unknown[];
  active: boolean;
  approved: boolean;
  additionalDetails: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  email: string;
  ownerDetails: OwnerDetails;
}

export interface OwnerDetails {
  _id: string;
  name: string;
  age: number;
  phoneNumber: string;
  proofType: string;
  proofOfId: string;
  email: string;
  staff: unknown[];
  buses: string[];
  address: string;
  __v: number;
}
