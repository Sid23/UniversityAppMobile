import { CoursesActions } from "./"
import { serverRequest } from './shared';

export function fetchCourses(authHeaders={}) {
    
    return function(dispatch) {

        return serverRequest(
            '/courses',
            'get',
            // Header of the request
            {},
            // Body of the request
            {},
            authHeaders)
            .then(
                response => {
                    console.log("SERVER RESPONSE: ", response);

                    if(response.status >= 300) {
                        dispatch({
                            type: CoursesActions.COURSES_ERROR,
                            payload: response.data.errors[0]
                        });
                        return;
                    }
                    dispatch({
                        type: CoursesActions.FETCH_COURSES,
                        payload: response
                    })
                }
            ).catch(error => {
                console.log("Request error: ", error);
                dispatch({
                    type: CoursesActions.COURSES_ERROR,
                    payload: response.data.errors[0]
                });
            })
    }
}