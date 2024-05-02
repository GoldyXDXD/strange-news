import {useEffect, useState} from "react";
import {
    Div,
    Header,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Group, Title, Button, Link,
} from "@vkontakte/vkui";
import {useParams, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {Comment} from "../modules/Comment.jsx";
import {BASEURL} from "../api/index.js";
import s from "./Panels.module.css"

export const News = ({id}) => {
    const routeNavigator = useRouteNavigator();
    const [currentNews, setCurrentNews] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const {newsId} = useParams() || {newsId: 0};

    const loadTopStories = async () => {
        const data = await BASEURL.get(`item/${newsId}.json`);
        setCurrentNews(data.data)
    };

    useEffect( () => {
        setIsLoading(true)
        loadTopStories()
        setIsLoading(false)
    }, []);

    if (isLoading) {
        return <Panel>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>Новости</PanelHeader>
            <Group>
                <Div>
                    <Title level='2'>Загрузка...</Title>
                </Div>
            </Group>
        </Panel>
    } return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}
            >
                Новость №{newsId}
            </PanelHeader>

            {currentNews && (
                <Group>
                    <Header mode="secondary">Название</Header>
                    <Div>{currentNews.title}</Div>

                    <Header mode="secondary">Опубликовано: </Header>
                    <Div>{new Date(currentNews.time).toLocaleDateString()}, {new Date(currentNews.time).toLocaleTimeString()}</Div>

                    <Header mode="secondary">Автор</Header>
                    <Div>{currentNews.by}</Div>

                    <Header mode="secondary"><Link href={currentNews.url} target="_blank">Ссылка на новость</Link></Header>

                    <Div className={s.commentsTitle}>
                        <Title level="3" style={{color: "#818c99", padding: "20px 16px"}}>Количество комментариев: {currentNews.descendants}</Title>

                        <RefreshComments refreshComments={loadTopStories}/>
                    </Div>

                    <Group>
                        <Div style={{paddingTop: "15px"}}>
                        {currentNews &&
                            currentNews.kids.map((kidId) => (
                                <Comment sub={false} key={kidId} commentId={kidId}/>
                            ))}
                        </Div>
                    </Group>
                </Group>
            )}
        </Panel>
    );
};

export const RefreshComments = ({refreshComments}) => {
    return (
        <Button appearance="neutral" onClick={refreshComments}>
            Обновить
        </Button>
    );
};
