export interface Template {
  id: string;
  name: string;
  url: string;
  serialNumber: string;
  icon: string;
}

// src/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Presenter';
}

export interface Template {
  id: string;
  name: string;
  url: string;
  serialNumber: string;
  icon: string; // This is the image URL
}
