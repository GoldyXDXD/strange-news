import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {Div, Group, Header, Title} from "@vkontakte/vkui";

export const Story = ({by, score, time, title, id}) => {

    const routeNavigator = useRouteNavigator()

    return (
        <Group style={{cursor: "pointer"}} onClick={() => routeNavigator.push(`/news/${id}`)} mode='card'
               header={<Header mode='secondary'>Автор: {by}</Header>}>
            <Div>
                <Title level='2'>{title}</Title>
            </Div>
            <Div>Рейтинг: {score}</Div>
            <Div>
                Опубликовано: {new Date(time).toLocaleDateString()}, {new Date(time).toLocaleTimeString()}
            </Div>
        </Group>
    )
}