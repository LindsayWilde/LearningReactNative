//@ts-check

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';

const News = () => {
    const [isLoaded, setDataLoaded] = useState(true);
    const [storyData, setStoryData] = useState();

    const getNews = async () => {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos');
            let stories = await response.json(); //turns data into something usable by react-native
            setStoryData(stories);
            setDataLoaded(false);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect (() => { //useEffect runs a function when this component is mounted
        getNews();
    }, []);  //empty array as second argument because it will make useEffect run only once. Otherwise, use effect would run multiple times.

    console.log(storyData);

    const newsItem = ({item}) => {
        return(
            <View style={styles.storylist}>
                <Image
                    style={styles.thumb}
                    source={{ uri: item.uri }}
                />

                <Text style={styles.storytext}>
                    {item.title}
                </Text>

                <Text style={styles.storytext}>
                    {item.url}
                </Text>
            </View>
        );
    };

    return(
        <View style={styles.container}>
            {isLoaded? <ActivityIndicator /> : (
                <FlatList
                    data={storyData}
                    renderItem={newsItem}
                    keyExtractor={(item) => item.title}
                />
            ) }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    storylist: {
        paddingBottom: 20
    },
    thumb: {  
        height: 100,
        width: '100%' //since we are loading from remote source, we need fixed dimensiongs
    },
    storytext: {
        padding: 10
    },
});

export default News;
