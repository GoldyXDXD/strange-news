import {Panel, PanelHeader, Group, Div, Title, Button} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import {getStory, getTopStories} from "../api/index.js";
import {Story} from "../modules/Story.jsx";
import s from "./Panels.module.css"

export const Home = ({id}) => {

    const [stories, setStories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [refr, setRefr] = useState(false)

    const loadTopStories = async () => {
        setIsLoading(true)
        const storyIds = await getTopStories();
        const storyPromises = storyIds.slice(0, 100).map(getStory);
        const fetchedStories = await Promise.all(storyPromises);
        const sortedStories = fetchedStories.sort((a, b) => b.time - a.time)
        setStories(sortedStories);
        setIsLoading(false)
    };
    useEffect(() => {
        loadTopStories();
    }, []);

    useEffect(() => {
        loadTopStories();
    }, [refr]);

    useEffect(() => {
        setInterval(() => {
            loadTopStories()
        }, 60000)
    }, [])


    if (isLoading) {
        return <Panel>
            <PanelHeader>
                Новости
            </PanelHeader>
            <Group>
                <Div>
                    <Title level='2'>Загрузка...</Title>
                </Div>
            </Group>
        </Panel>
    } else {return (
        <Panel id={id}>
            <PanelHeader>
                Новости
            </PanelHeader>
            <Group mode='card'>
                <Div className={s.news}>
                    <Div style={{paddingLeft: "0px"}}>
                        <Title level='2'>Показаны последние 100 новостей</Title>
                    </Div>
                    <RefreshNews setRefr={setRefr}/>
                </Div>


            </Group>
            {stories.map(story =>
                <Story by={story.by}
                       score={story.score}
                       time={story.time}
                       title={story.title}
                       id={story.id} />
            )
            }
        </Panel>
    );
}};

Home.propTypes = {
    id: PropTypes.string.isRequired
};
export const RefreshNews = ({setRefr}) => {
    return (
        <Button appearance="neutral" onClick={setRefr}>
            Обновить
        </Button>
    );
};
