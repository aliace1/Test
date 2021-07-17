import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepForward,
  faPlayCircle,
  faStepBackward,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import './_player.scss';
import axios from 'axios';

const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";

export default function Player() {

  const [token, setToken] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"))
    }

    axios
      .get(PLAYLISTS, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  console.log('********Data********', data);

  return (
    <div className="player">
      <div className="player__album">
        <span />
        {/* <p>Nothing's playing</p> */}
        {data.items && data.items.map((item) => <p>{item.title}</p>)}
      </div>
      <div className="player__controls">
        <FontAwesomeIcon icon={faStepBackward} />
        <FontAwesomeIcon icon={faPlayCircle} />
        <FontAwesomeIcon icon={faStepForward} />
      </div>
      <div className="player__seekbar" />
      <div className="player__actions">
        <FontAwesomeIcon icon={faEllipsisH} />
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faRandom} />
        <FontAwesomeIcon icon={faRetweet} />
        <FontAwesomeIcon icon={faVolumeDown} />
      </div>
    </div>
  );
}
