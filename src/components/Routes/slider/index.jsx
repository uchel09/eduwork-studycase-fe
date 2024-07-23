import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { slide1, slide2 } from "../../../assets";
import "./slider.css";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "../../../styles/style";

const Slider2 = () => {
  const images = [
    { image: slide1 },
    { image: slide2 },

    { image: slide1 },
    { image: slide2 },
    { image: slide1 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  return (
    <section className={`${styles.section} mt-10`}>
      <div className="carousel-container">
        <Carousel
          className="carousel"
          interval={3000}
          autoPlay
          centerMode
          infiniteLoop
          centerSlidePercentage={55}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          selectedItem={activeIndex}
          transitionTime={800}
          width={"100%"}
        >
          {images.map((item, index) => (
            <div key={index} className="carousel-item">
              <img
                src={item.image}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
                style={{ width: index === activeIndex ? "90%" : "80%" }}
              />
            </div>
          ))}
        </Carousel>
        <div className="controls">
          <button onClick={handlePrev}>
            <IoIosArrowBack size={30} />
          </button>
          <button onClick={handleNext}>
            <IoIosArrowForward size={30} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider2;
