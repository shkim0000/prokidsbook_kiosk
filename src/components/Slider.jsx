import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = (props) => {
  const groupedSlides = [];
  for (let i = 0; i < props.slideList.length; i += 3) {
    groupedSlides.push(props.slideList.slice(i, i + 3)); // 3개씩 슬라이싱
  }

  return (
    <Swiper
      modules={ [Navigation, Pagination] }
      navigation={ props.navigation ? props.navigation : false }
      pagination={ props.pagination ? props.pagination : false }
      spaceBetween={ props.spaceBetween ? props.spaceBetween : 0 }
      slidesPerView={ props.slidesPerView ? props.slidesPerView : 1 }
      centeredSlides={ props.centeredSlides ? props.centeredSlides : false }
      loop={props.loop ? props.loop : false}
      className={props.className ? props.className : ''}
      style={{ height: props.height ? `${props.height}px` : 'auto' }}
    >
      { props.type === "multi" ?
        <>
          { groupedSlides.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="radio-wrap">
                {group.map((item, subIndex) => (
                  <label key={subIndex} onClick={() => {props.setBtnActive(true)}}>
                    <input type="radio" name="job"/>
                    <span>{item.name}</span>
                  </label>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </>
        :
        props.type === "bookReader" ?
          <>
            { props.slideList.map((item, index) => {
              return (
                <SwiperSlide key={index} className="book-padges">
                  <img src={`/src/assets/img/charStyle/${item.imgName}`} alt=""/>
                  <p>{item.name}</p>
                </SwiperSlide>
              )
            })}
          </>
          :
          <>
            { props.slideList.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={`/src/assets/img/charStyle/${item.imgName}`} alt=""/>
                  <p>{item.name}</p>
                </SwiperSlide>
              )
            })}
          </>
      }
    </Swiper>
  )
}

export default Slider
