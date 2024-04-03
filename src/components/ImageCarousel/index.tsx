import { Icon } from "@iconify/react/dist/iconify.js"
import * as S from "./styles"
import { useState } from "react"
import normalizeString from "@/helpers/normalizeString"
interface ImageCarouselProps {
  images: Array<{ src: string, alt: string, type: "image" | "video" }>
}
export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0)

  const translate = (direction: "left" | "right") => {
    if (direction === "left") {
      setImageIndex(prev => prev - 1)
    } else {
      setImageIndex(prev => prev + 1)
    }
  }
  return (
    <S.ImageCarousel>
      {
        imageIndex !== 0 && (
          <button className="btn-slider" onClick={() => translate("left")} style={{ left: 0 }}>
            <Icon icon="eva:arrow-left-fill" />
          </button>
        )
      }

      <div className="carousel">
        {
          images.map((img, index) => (
            <>
              {
                img.type === "image" ? (
                  <img
                    key={`image-in-carousel-${index}-${normalizeString(img.alt, {
                      toLowerCase: true,
                      replaceSpaces: true
                    })}`}
                    src={img.src}
                    alt={img.alt}
                    style={{ transform: `translateX(${-100 * (imageIndex)}%)` }}
                  />
                ) : (
                  <video
                    key={`video-in-carousel-${index}-${normalizeString(img.alt, {
                      toLowerCase: true,
                      replaceSpaces: true
                    })}`}
                    src={img.src}
                    style={{ transform: `translateX(${-100 * (imageIndex)}%)` }}
                    controls
                    autoPlay
                  />
                )
              }

            </>

          ))
        }
      </div>
      {
        imageIndex + 1 !== (images.length) && (
          <button className="btn-slider" onClick={() => translate("right")} style={{ right: 0 }}>
            <Icon icon="eva:arrow-right-fill" />
          </button>
        )
      }

      <ul className="circles-navigation">
        {
          images.map((img, index) => <li key={`pointer-in-carousel-${index}-${normalizeString(img.alt, {
            toLowerCase: true,
            replaceSpaces: true
          })}`} className={index === imageIndex ? "current" : ""} />)
        }
      </ul>
    </S.ImageCarousel>
  )
}