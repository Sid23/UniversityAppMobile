// Definitions of actions that are common in the application
import axios from 'axios';
import { SERVER_URL } from '../config/url';

export function serverRequest(relativePath, method, header, body, authHeaders = null) {
    console.log("####v ", relativePath)
    return axios.request({
        url: SERVER_URL + relativePath,
        method: method,
        headers: Object.assign({},{
                    'Content-Type': 'application/json'
                },
                authHeaders,
                header),
        data: body,
        validateStatus: function (status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
        }
    })
}

// Function that return a student object from a backend serrver response
export function getStudentDetails(serverResponse) {
    return {
        id: serverResponse.data.id,
        name: serverResponse.data.name,
        surname: serverResponse.data.surname,
        email: serverResponse.data.email,
        admin: serverResponse.data.type,
        image : serverResponse.data.image
    }
}