import "./listItem.scss";
import {PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined} from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//  item is id
export default function ListItem({index, item}) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});


    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("movies/find/" + item,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzlkMjg4ZmVkODI5Njc1ZmQ0Mzc2MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTI0MjcxNSwiZXhwIjoxNjMxNjc0NzE1fQ.OPW50HWjZOZV4s6mZe0KVuinEX1TuQPs91YqBzRr1FE"
                        }
                    })
                setMovie(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMovie();
    }, [item]);

    const {imgSm, duration, desc, limit,genre,trailer, year, title} = movie;

    return (
        <Link to={{ pathname: "/watch", movie: movie }}>

        <div
            className="listItem"
            style={{left: isHovered && index * 225 - 50 + index * 2.5}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={imgSm} alt=""/>
            {isHovered && (
                <>
                    <video src={trailer} autoPlay={true} loop/>
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon"/>
                            <Add className="icon"/>
                            <ThumbUpAltOutlined className="icon"/>
                            <ThumbDownOutlined className="icon"/>
                        </div>
                        <div className="itemInfoTop">
                            <span>{title}</span>
                            <span>{duration}</span>
                            <span className="limit">+{limit}</span>
                            <span>{year}</span>
                        </div>
                        <div className="desc">{desc}</div>
                        <div className="genre">{genre}</div>
                    </div>
                </>
            )}
        </div>
        </Link>
    );
}
