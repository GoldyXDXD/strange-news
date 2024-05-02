import {Avatar, Div, Title} from "@vkontakte/vkui";
import axios from "axios";
import {useEffect, useState} from "react";
import he from "he";
import s from "./Comment.module.css"


export const Comment = ({commentId, sub}) => {
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpenReplies, setIsOpenReplies] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
            .then((resp) => {
                if (
                    resp.data &&
                    !Object.prototype.hasOwnProperty.call(resp.data, "deleted")
                ) {
                    if (resp.data.text) {
                        resp.data.text = he
                            .decode(resp.data.text)
                            .replace(/<\/?[^>]+(>|$)/g, "");
                    }
                    setComment(resp.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [commentId]);

    if (loading) return <Div>Загрузка...</Div>;
    if (!comment) return <Div>Комментарий удален</Div>;

    return (
        <Div className={sub ? s.subComment : s.comment}>
            <div className={s.profile}>
                <Avatar
                    src={`https://www.gravatar.com/avatar/${commentId}?d=identicon`}
                    className={s.avatar}
                />
                <Title level="3">{comment.by}</Title>
            </div>
            <Div style={{lineHeight: "1.5"}}>
                {comment.text === "[dead]" ? "(Комментарий удален)" : comment.text}
            </Div>


            {comment.kids && (
                <ShowAnswersBtn
                    isOpenReplies={isOpenReplies}
                    toggleReplies={() => setIsOpenReplies(!isOpenReplies)}
                />
            )}
            {isOpenReplies &&
                comment.kids &&
                comment.kids.map((kidId) => <Comment sub={true} key={kidId} commentId={kidId}/>)}
        </Div>
    );
};


export const ShowAnswersBtn = ({isOpenReplies, toggleReplies}) => {
    return (
        <Div style={{cursor: "pointer", color: "#595959"}} onClick={toggleReplies}>
            {isOpenReplies ? "Скрыть ответы" : "Показать ответы"}
        </Div>
    );
};