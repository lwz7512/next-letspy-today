import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'


const ImageWithCover = ({ coverImgStr, imgSrc, imgNight, altName }) => {

  const [loaded, setLoaded] = useState(false)
  const timeRef = useRef(0)

  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const darkMode = new Date().getHours()>18 || new Date().getHours() < 5;
    setIsNight(darkMode)
    console.log('>>>'+darkMode)
  }, []);

  useEffect(() => {
    timeRef.current = setInterval(() => {
      const target = document.querySelector(`#img-${altName}`)
      if(!target) return
      if(!target.complete) return

      clearInterval(timeRef.current) // detection completed
      setLoaded(true) // hide placeholder
    }, 200)

    return () => clearInterval(timeRef.current)
  }, [])


  return (
    <>
      {!loaded && 
        <img 
          src={coverImgStr} 
          style={{
            objectFit: 'cover', 
            width: '100%', height: '100%', 
            margin: 0, 
            zIndex: 20, position: 'absolute'
          }}
        />
      }
      {!isNight &&
        <Image
          id={`img-${altName}`}
          alt={altName}
          src={imgSrc}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      }
      {isNight &&
        <Image
          id={`img-${altName}`}
          alt={altName}
          src={imgNight}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      }
    </>
  )
}

export default ImageWithCover