import React, {Component} from 'react';
import { Platform, StyleSheet, TextInput, Text, View, Button, Dimensions, FlatList, ListItem, List } from 'react-native';
import { connect } from 'react-redux';

// import login action
import { fetchCourses } from '../actions/courses';

class CoursesList extends Component {

    constructor(props) {
        super(props);

        // Component state
        this.state = {
            loading: false,
            coursesList: [
                {
                    "id": 27,
                    "code": "123VBG3Y",
                    "name": "Course3",
                    "year": 2013,
                    "difficulty": 2
                },
                {
                    "id": 3,
                    "code": "AAAABBCC",
                    "name": "Course2",
                    "year": 2013,
                    "difficulty": 5
                },
                {
                    "id": 30,
                    "code": "12DV78YS",
                    "name": "Prova",
                    "year": 2012,
                    "difficulty": 1
                }
            ],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        console.log("Fetching courses...") 
        this.props.fetchCourses(this.props.auth.authHeaders)
    }

    render () {
        return (
            <View style={styles.coursesListContainer}>

            
                    <FlatList
                        data={this.state.coursesList}
                        renderItem={({ item }) => (
                            <ListItem
                              title={`${item.name}`}
                              subtitle={item.year}
                              keyExtractor={item => item.id}
                            />
                          )}
                        
                    />
                

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        courses: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCourses: (authHeaders) => dispatch(fetchCourses(authHeaders))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);

const styles = StyleSheet.create({
    coursesListContainer: {
        backgroundColor: 'pink',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 20
    },
});
