import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./App.css";

export const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("https://api.unsplash.com/photos/?client_id=PWuLcm4KmXnbpPzmhzKRrI8iPFZt1gry5kar_-lu7lg")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <>
      <Navbar />
      {items.map(item => (
        <Card key={item.id}
              name={item.user.first_name}
              image={item.urls.regular}
              comment={item.user.bio}
              profile_image={item.user.profile_image.small}>
        </Card>
      ))}
    </>
  );
}

export const Card = (props) => {
  return (
    <div className="card">
      <Username name={props.name}
                profile_image={props.profile_image}
      />
      <Image image={props.image}/>
      <Status name={props.name}
              comment={props.comment}
      />
      <Comment />
    </div>
  );
};

export const Username = (props) => {
  return (
    <div className="username">
      <img src={props.profile_image}></img>
      <p>{props.name}</p>
    </div>
  );
};

export const Image = (props) => {
  return (
    <img
    className="postImage"
    src={props.image}
    ></img>
    );
  };

export const Status = (props) => {
  return (
    <div className="status">
    <div className="like">
      <img src="https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Heart-128.png"></img>
      <img src="https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Chat_bubble-128.png"></img>
    </div>

    <div>
      <b>{props.name}</b> {props.comment}
    </div>
  </div>
  );
};

export const Comment = () => {
  return (
    <div className="commentInput">
      <textarea placeholder="Add a comment…"></textarea>
      <img src="https://i.stack.imgur.com/twIm6.png"></img>
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="Nav">
      <div className="Nav-menus">
        <div className="Nav-brand">
          <a className="Nav-brand-logo" href="/">
            Instagram
          </a>
        </div>
      </div>
    </nav>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
