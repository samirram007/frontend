import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const moduleApiPath='/user_initial_values'
export function fetchUserInitialValueByKeyService(key) {
    return getData(`${moduleApiPath}?key=${key}`)
}

export function fetchUserInitialValuesService() {
    return getData(`${moduleApiPath}`)    
}

export async function  storeUserInitialValueService(payload) {
    return await postData(`${moduleApiPath}`,payload)
 }

export function updateUserInitialValueService(payload) {
    const { id, ...data } = payload;
    
    return putData(`${moduleApiPath}/${id}`,data)
}
export function deleteUserInitialValueService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${moduleApiPath}/${id}`)
     
}
