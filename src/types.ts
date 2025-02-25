// export interface Template {
//   id: string;
//   name: string;
//   url: string;
//   serialNumber: string;
//   icon: string;
// }

export interface Template {
  id: string; 
  name: string;
  url: string;
  serialNumber: string;
  icon: string; // This will be the Cloudinary image URL.
}


export interface NewTemplate {
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



export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Presenter';
}
