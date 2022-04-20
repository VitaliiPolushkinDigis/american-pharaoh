import { FC, useEffect, useRef, useState } from 'react';
import { mockdata } from '../../api/mockData/mockdata';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from '../../../styles/pages/home/home.module.css';
import Carousel from '../../common/components/Slider/Slider';

export type MockData = {
  [key: string]: Thumb[];
};

export type Thumb = {
  id: string;
  tee_time: string;
  thumbnail: string;
};

export const Home: FC = () => {
  const [data, setData] = useState<MockData>({});
  const [page, setPage] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const groupMocks = (mappedData: Thumb[]) => {
    return [...mappedData].reduce((acc: any, value) => {
      const hours = value.tee_time.substring(0, value.tee_time.length - 3);
      const minutes = ((Math.floor((Number(value.tee_time.slice(-2)) - 1) / 10) + 1) * 10) % 60;

      const transformHours = (hours: number) => {
        if (Number(value.tee_time.slice(-2)) > 50) {
          if (hours !== 23) {
            hours++;
          } else {
            hours = 0;
          }
        }
        return hours;
      };

      if (!acc[`${transformHours(Number(hours))}:${minutes}`]) {
        acc[`${transformHours(Number(hours))}:${minutes}`] = [];
      }

      acc[`${transformHours(Number(hours))}:${minutes}`].push(value);

      return acc;
    }, {});
  };

  useEffect(() => {
    const mappedData: Thumb[] = mockdata.sort((a, b) =>
      Number(a.tee_time.replace(':', '')) > Number(b.tee_time.replace(':', '')) ? 1 : -1,
    );
    setData(groupMocks(mappedData));
  }, []);

  return (
    <div>
      <h1 className={s.date}>Mar 4, 2022</h1>
      <h2 className={s['carousel-title']}>
        Time of your shot <span className={s['carousel-title_gray']}>(estimated)</span>
      </h2>
      <div className="carousel">
        <Carousel mocks={data} page={page} onChange={(next) => setPage(next)} sliderRef={sliderRef} />
      </div>
      <div className={s.form}>
        <label className={s.container}>
          By selecting your diveo content, you agree to our <span className={s.label__terms}>Terms of Service</span>
          <input type="checkbox" />
          <span className={s.checkmark}></span>
        </label>
      </div>
    </div>
  );
};
