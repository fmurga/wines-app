import { Slide } from "react-slideshow-image"
import { FC } from 'react';

import styles from './css/ProductSlideshow.module.css'
import 'react-slideshow-image/dist/styles.css'

interface Props {
    images: string[];
}

export const ProductSlideshow: FC<Props> = ({images}) => {
  return (
    <Slide  easing="ease" duration={7000} indicators>
        {
            images.map( image => {
                const url = `/products/${image}`
                return (
                    <div className={styles['each-slide']} key={image}>
                        <div style={{backgroundImage:`url(${url})`, backgroundSize: "cover"}}>

                        </div>
                    </div>
                )
            }
            )
        }
    </Slide>
  )
}
