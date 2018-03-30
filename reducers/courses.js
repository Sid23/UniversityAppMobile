import { CoursesActions } from '../actions';

const INITIAL_STATE = {
    coursesList: [],
    selectedCourse: null
};

export default function(state = INITIAL_STATE, action) {
   
    let newState;
    console.log("ACTION: ", action);

    switch (action.type) {
        
        case CoursesActions.FETCH_COURSES:
            newState = {...state};
            newState.selectedCourse = null;
            newState.coursesList = action.payload;
            console.log("Courses fetched...");
            return newState;

        default:
            return state;
    }
}