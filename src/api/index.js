import axios from "axios";

export const BASEURL =  axios.create(
    {
        baseURL: 'https://hacker-news.firebaseio.com/v0/'
    }
)
export const getTopStories = async () => {
    try {
        const { data } = await BASEURL.get(`topstories.json`);
        return data;
    } catch (error) {
        return [];
    }
};

export const getStory = async (storyId) => {
    try {
        const { data } = await BASEURL.get(`item/${storyId}.json`);
        return data;
    } catch (error) {
        return null;
    }
};

export const getAllComments = async (id) => {
    try {
        const { data } = await BASEURL.get(`item/${id}.json`);
        if (data) return data
        return []
    } catch (error) {
        return [];
    }
};

export const getComm = async (storyId) => {
    try {
        const { data } = await BASEURL.get(`item/${storyId}.json`);
        return data
    } catch (error) {
        return null;
    }
};