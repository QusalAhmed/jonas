'use client'
import React, { useCallback, useEffect } from 'react';
import { cn } from "@/lib/utils";

// Local
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

// Next.js
import Image from 'next/image';

// Embla Carousel
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay';

// CSS
import heroStyle from './heroSection.module.css';

// Icons
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

const SLIDES = [
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
    'https://images.unsplash.com/photo-1664575599736-c5197c684128',
    'https://images.unsplash.com/photo-1756143058409-bbd6c8d6d051',
    'https://images.unsplash.com/photo-1664575599730-0814817939de',
    'https://images.unsplash.com/photo-1755306064502-6df8d7ee33f7',
    'https://images.unsplash.com/photo-1755371034010-51c25321312d',
    'https://images.unsplash.com/photo-1757058995107-ca5edd164d12',
]

const HeroSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
        },
        [Autoplay({
            stopOnInteraction: false,
        })]
    );

    const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

    const logSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
        console.log(emblaApi.slidesInView())
    }, [])
    useEffect(() => {
        if (emblaApi) emblaApi.on('slidesInView', logSlidesInView)
    }, [emblaApi, logSlidesInView])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <>
            <div className={heroStyle.embla}>
                <div className={heroStyle.embla__viewport} ref={emblaRef}>
                    <div className={heroStyle.embla__container}>
                        {SLIDES.map((src, index) => (
                            <div className={heroStyle.embla__slide} key={index}>
                                <Image src={src}
                                       alt={"Carousal"}
                                       width={800}
                                       height={500}
                                       priority
                                       style={index === emblaApi?.selectedScrollSnap() ? { filter: 'blur(0px)' }: {}}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={heroStyle.embla__controls}>
                        <div className={heroStyle.embla__button}>
                            <button className={heroStyle.embla__prev}
                                    onClick={scrollPrev} title={'Previous Slide'}
                                    disabled={emblaApi?.canScrollPrev() === false}
                            >
                                <CircleArrowLeft color={'black'} size={20}/>
                            </button>
                            <button className={heroStyle.embla__next}
                                    onClick={scrollNext} title={'Next Slide'}
                                    disabled={emblaApi?.canScrollNext() === false}
                            >
                                <CircleArrowRight color={'black'} size={20}/>
                            </button>
                        </div>

                        <div className={heroStyle.embla__dots}>
                            {scrollSnaps.map((_, index) => (
                                <DotButton
                                    key={index}
                                    onClick={() => onDotButtonClick(index)}
                                    className={cn(
                                        heroStyle.embla__dot,
                                        index === selectedIndex ? heroStyle.embla__dot__selected : heroStyle.embla__dot
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-pressed={index === selectedIndex}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;