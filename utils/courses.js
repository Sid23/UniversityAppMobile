import { serverRequest } from '../actions/shared';

export function fetchCourses(authHeaders={}, page=1) {
    
    return serverRequest(
        `/courses?page=${page}`,
        'get',
        // Header of the request
        {},
        // Body of the request
        {},
        authHeaders)
        .then(
            response => {
                if(response.status >= 300) 
                    return {
                        error: response.data.errors[0]
                    }

                // Returns list of courses
                return {
                    data: response.data,
                    total: response.headers['total'],
                    perPage: response.headers['per-page']
                }
            }
        ).catch(
            error => {
                console.log("Request error: ", error);
                return {
                    error: response.data.errors[0]
                }
            }
        )
}