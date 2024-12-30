import Carousel from "../carousel/Carousel";
import "./EventImages.css";

const EventImages = ({ images }) => {
  const filteredImages = images.filter((image) => image.ratio === "3_2");
  return (
    <section aria-labelledby="event-images" className="event-images">
      {filteredImages && filteredImages.length > 0 ? (
        <Carousel images={filteredImages} />
      ) : (
        <p>No images available</p>
      )}
    </section>
  );
};

export default EventImages;
