import styled from "styled-components";
import Slider from "react-slick";

const StyledSlider = styled(Slider)`
  height: 330px;
  margin: 30px;
  min-width: 550px;

  .slick-list {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
  }

  .slick-slide img {
    width: 400px;
    height: 300px;
    object-fit: fill;
    margin: 0 auto;
  }

  .slick-dots {
    bottom: -10px;
    margin-top: 200px;
  }

  .slick-track {
    width: 100%;
  }
`;

const ImageCarousel = ({ imageInfo }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 800,
  };

  return (
    <StyledSlider {...settings}>
      {imageInfo.shopPics.map((el, idx) => {
        return (
          <div key={idx}>
            <img src={el} />
          </div>
        );
      })}
    </StyledSlider>
  );
};

export default ImageCarousel;
