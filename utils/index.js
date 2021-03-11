import { batch } from "react-redux";

export const baseURL = typeof window === "object" && window.location.origin;

// export const fetchAndDispatchData = (...subdomains) => {
//     const allData = [];

//     subdomains.forEach(async (subdomain) => {
//         const response = await fetch(`${baseURL}/api/${subdomain}`);
//         const json = await response.json();

//         allData.push(json);
//     });

//     if (subdomains.length > 1) {
//         batch(() => {

//         })
//     }
// };
