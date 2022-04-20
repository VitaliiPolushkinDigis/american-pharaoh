import React, { MutableRefObject } from 'react';
import Slider from 'react-slick';
import { MockData, Thumb } from '../../../pages/Home/Home';
import s from '../../../../styles/pages/home/home.module.css';
import { formatTeeTime } from '../../../utils/teeTimeFormatter';

type CarouselProps = {
  sliderRef: MutableRefObject<Slider | null>;
  onChange: (page: number) => void;
  mocks: MockData;
  page: number;
};

const Carousel: React.FC<CarouselProps> = ({ sliderRef, onChange, mocks, page }) => (
  <Slider
    ref={sliderRef}
    lazyLoad="progressive"
    beforeChange={(_, next) => onChange(next)}
    centerMode
    speed={300}
    slidesToShow={3}
    swipeToSlide
    arrows={false}
  >
    {Object.keys(mocks).map((el, i) => {
      return (
        <div
          key={i}
          className={`${s['slide-item']} ${i === page ? s.active : ''}`}
          onClick={() => {
            sliderRef.current?.slickGoTo(i);
          }}
        >
          <div className={s.title}>{formatTeeTime(el)}</div>
          <img
            style={{
              width: Math.abs(page - i) <= 2 ? `${100 - Math.abs(page - i) * 20}%` : `60%`,
              height: Math.abs(page - i) <= 2 ? `${100 - Math.abs(page - i) * 20}%` : `60%`,
            }}
            className={s.img}
            src={mocks[el][mocks[el].length - 1].thumbnail}
          />
        </div>
      );
    })}
  </Slider>
);

export default Carousel;
