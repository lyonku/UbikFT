import ArtistsItem__avatar from "assets/img/artists-avatar.png";
import ArtistsItem__img1 from "assets/img/artists-img.png";
import ArtistsItem__img2 from "assets/img/artists-img2.png";
import ArtistsItem__img3 from "assets/img/artists-img3.png";
import ArtistsItem__img4 from "assets/img/artists-img4.png";

function ArtistsItem({ item, index }) {
  return (
    <div className="ArtistsItem">
      <div className="ArtistsItem__header">
        <div className="ArtistsItem__ratingNum">{index + 1}</div>
        <div className="ArtistsItem__avatar">
          <img src={ArtistsItem__avatar} />
        </div>
        <div className="ArtistsItem__name">{item.name}</div>
      </div>
      <div className="ArtistsItem__body">
        <div className="ArtistsItem__img">
          <img src={ArtistsItem__img1} />
        </div>
        <div className="ArtistsItem__img">
          <img src={ArtistsItem__img2} />
        </div>
        <div className="ArtistsItem__img">
          <img src={ArtistsItem__img3} />
        </div>
        <div className="ArtistsItem__img">
          <img src={ArtistsItem__img4} />
        </div>
        <div className="ArtistsItem__img">
          <img src={ArtistsItem__img4} />
        </div>
      </div>
    </div>
  );
}

export default ArtistsItem;
