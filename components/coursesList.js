import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';

// import courses utils functions
import { fetchCourses } from '../utils/courses';
import { serverRequest } from '../actions/shared';

class CoursesList extends Component {

    constructor(props) {
        super(props);

        // Component state
        this.state = {
            coursesList: [],
            loading: false,
            refreshing: false,
            page: 1,
            nPages: 1,
            error: null
        };
    }

    makeRemoteRequest = () => {
        
        if (this.state.page <= this.state.nPages) {

            console.log("## Request with page: ", this.state.page)

            serverRequest(
                `/courses?page=${this.state.page}`,
                'get',
                // Header of the request
                {},
                // Body of the request
                {},
                this.props.auth.authHeaders
            ).then( 
                res => {
                    if(res.status >= 300) {
                        this.setState({error: res.data.errors[0], cousesList: null, loading: false})
                        return
                    }

                    // Returns list of courses
                    this.setState({
                        coursesList: (res.data) ? (this.state.page === 1 ? res.data : [...this.state.coursesList, ...res.data]) : null,
                        nPages: (parseInt(res.headers.total) / parseInt(res.headers['per-page']) + 1),
                        error: (res.data.errors) ? response.data.errors[0] : null,
                        loading: false,
                        refreshing: false
                    }, console.log("XXXXXX State changed: ", this.state))
                }
            ).catch(
                error => {
                    console.log("fetch courses error: ", error);
                    this.setState({ error, data: null, loading: false })
                }
            )
        }
    }

    componentDidMount() {
        console.log("CoursesList DidMount...") 
        this.makeRemoteRequest()
    }

    renderItemSeparator = () => {
        return(
            <View style={{
                    marginVertical: 5,
                    height: 1,
                    backgroundColor: "black",
                    marginHorizontal: "2%"
                }} />
        );
    }

    renderFooter = () => {
        // Do not show footer if there is any incoming network request
        if (!this.state.loading) return null;
    
        return (
            <ActivityIndicator size="large" />
        );
    }

    // Triggered when the end of the list is reached
    loadMoreElements = () => {
        console.log("Loading more elements....");
        // Update page number, and define its callback
        this.setState(
            {
                page: this.state.page + 1
            }, () => {
                console.log("Page changed to : ", this.state.page);
                this.makeRemoteRequest();
            }
        );
    }

    // method called when the list refresh is needed
    refreshList = () => {
        console.log("List refreshing....");
        this.setState({
            // Reset the page
            page: 1,
            refreshing: true
          },() => {
            // After page is reset, make the backend request again
            this.makeRemoteRequest();
          }
        );
      };

    render () {
        return (
            <View style={styles.coursesListContainer}>
                <FlatList
                    data={this.state.coursesList}
                    renderItem={({ item }) => (
                        <ListItem
                            code={item.code}
                            name={item.name}
                            year={item.year}
                            difficulty={item.difficulty}
                        />
                    )}  
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderItemSeparator}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.loadMoreElements}
                    onEndReachedThreshold={0.01}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refreshList}
                />
            </View>   
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
  
export default connect(mapStateToProps, null)(CoursesList);

// Component that define the rendered item into a list
class ListItem extends Component {
    render(){
        return (
            <View style={{marginHorizontal: "2%"}}>
                <Text>{this.props.code.toUpperCase()} - {this.props.name}</Text>
                <Text>Year {this.props.year}, difficulty: {this.props.difficulty}</Text>
            </View>
        );
    }
}

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
