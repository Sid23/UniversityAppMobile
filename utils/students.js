import { serverRequest } from '../actions/shared';

// Fetch a student with id passed as parameter
export function fetchStudent(id, authHeaders) {
    console.log("----------- FETCH STUDENT");
    return serverRequest(
        `users/${id}`,
        'get',
        // Custom Header of the request
        {},
        // Body of the request
        {},
        // Header used for authentication
        authHeaders
    )
}