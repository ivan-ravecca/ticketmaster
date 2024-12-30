import { Component } from "react";
import "./Carousel.css";

class Carousel extends Component {
  state = {
    active: 0,
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active].url} alt="Event image" />
        <div className="carousel-smaller">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={index === active ? "active" : ""}
              alt={`event thumbnail ${image.ratio}`}
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
