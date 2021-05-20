import React, { VFC } from 'react'
// import/no-extraneous-dependencies
import styled, { css, keyframes } from 'styled-components'
import { ImCircleLeft, ImCircleRight } from 'react-icons/im'

const StyledCarousel = styled.div`
  width: 100%;
`
const StyledCarouselListWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`
const animationSlide = (toTranslate: number) =>
  keyframes({
    from: { transform: `translateX(0)` },
    to: { transform: `translateX(${toTranslate}%)` },
  })

const StyledCarouselList = styled.ul<{
  isChange: boolean
  duration: number
  toTranslate: number
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  ${props =>
    props.isChange &&
    css`
      animation: ${animationSlide(props.toTranslate)};
      animation-fill-mode: forwards;
      animation-duration: ${props.duration || 500}ms;
    `}
`
const StyledButtonWrapper = styled.button`
  position: absolute;
  background-color: transparent;
  border: 0;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`
const StyledBackButtonWrapper = styled(StyledButtonWrapper)`
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
`
const StyledNextButtonWrapper = styled(StyledButtonWrapper)`
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
`
const StyledCarouselDotListWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
  width: 80px;
`
const animationDotSlide = (fromTranslate: number, toTranslate: number) =>
  keyframes({
    from: { transform: `translateX(${fromTranslate})` },
    to: { transform: `translateX(${toTranslate}%)` },
  })

const StyledCarouselDotList = styled.ul<{
  isChange: boolean
  duration: number
  toTranslate: number
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  ${props =>
    props.isChange &&
    css`
      animation: ${animationDotSlide(0, props.toTranslate)};
      animation-fill-mode: forwards;
      animation-duration: ${props.duration || 500}ms;
    `}
`
type CarouselProps = {
  isChange: boolean
  isDotChange: boolean
  duration: number
  toTranslate: number
  dotTranslate: {
    toTranslate: number
    fromTranslate: number
  }
  onClickBack: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClickNext: (event: React.MouseEvent<HTMLButtonElement>) => void
  dotChildren: React.ReactNode
  children: React.ReactNode
}
export const Carousel: VFC<CarouselProps> = ({
  isChange,
  isDotChange,
  duration,
  toTranslate,
  dotTranslate,
  onClickBack,
  onClickNext,
  dotChildren,
  children,
}) => (
  <StyledCarousel>
    <StyledCarouselListWrapper>
      <StyledCarouselList
        isChange={isChange}
        duration={duration}
        toTranslate={toTranslate}
      >
        {children}
      </StyledCarouselList>
      <StyledBackButtonWrapper onClick={onClickBack}>
        <ImCircleLeft size="22px" color="#C5C5C5" />
      </StyledBackButtonWrapper>
      <StyledNextButtonWrapper onClick={onClickNext}>
        <ImCircleRight size="22px" color="#C5C5C5" />
      </StyledNextButtonWrapper>
      <StyledCarouselDotListWrapper>
        <StyledCarouselDotList
          isChange={isDotChange}
          duration={500}
          {...dotTranslate}
        >
          {dotChildren}
        </StyledCarouselDotList>
      </StyledCarouselDotListWrapper>
    </StyledCarouselListWrapper>
  </StyledCarousel>
)

const StyledCarouselListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: stretch;
  min-width: 100%;
  & > * {
    width: 100%;
  }
`
export const CarouselListItem: VFC<{ children: React.ReactNode }> = ({
  children,
}) => <StyledCarouselListItem>{children}</StyledCarouselListItem>

const StyledCarouselDot = styled.li`
  display: block;
  margin: 0 4px;
`
const StyledCarouselDotButton = styled.button<{ isCurrent: boolean }>`
  display: block;
  width: 8px;
  height: 8px;
  padding: 0;
  background-color: ${props => (props.isCurrent ? '#FFF' : '#D1D1D1')};
  border: 0;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`
type CarouselDotProps = {
  isCurrent: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export const CarouselDot: VFC<CarouselDotProps> = ({ isCurrent, onClick }) => (
  <StyledCarouselDot>
    <StyledCarouselDotButton isCurrent={isCurrent} onClick={onClick} />
  </StyledCarouselDot>
)
