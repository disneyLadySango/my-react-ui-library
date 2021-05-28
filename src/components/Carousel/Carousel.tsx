import React, { VFC, useMemo, useCallback } from 'react'

import { useCarousel } from './useCarousel'
import * as Presenter from './CarouselPresenter'

type DotProps = {
  currentPage: number
  index: number
  onClickDot: (page: number) => void
}
const Dot: VFC<DotProps> = ({ currentPage, index, onClickDot }) => {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      onClickDot(index)
    },
    [index, onClickDot],
  )
  const isCurrent = useMemo(() => currentPage === index, [currentPage, index])
  return <Presenter.CarouselDot {...{ isCurrent, onClick }} />
}

type DotListProps = {
  currentPage: number
  lastIndex: number
  onClickDot: (page: number) => void
}
const DotList: VFC<DotListProps> = ({ currentPage, lastIndex, onClickDot }) => {
  const dotItems = useMemo(
    () => new Array(lastIndex + 1).fill('dot'),
    [lastIndex],
  )
  const children = useMemo(
    () =>
      dotItems.map((_, index) => (
        <Dot
          key={`dot-key-${currentPage}-${String(index)}`}
          {...{ currentPage, onClickDot, index }}
        />
      )),
    [currentPage, dotItems, onClickDot],
  )
  return <>{children}</>
}

type Props = {
  duration?: number
  itemChildren: React.ReactNodeArray
}
const Carousel: VFC<Props> = ({ itemChildren, duration = 100 }) => {
  const [states, actions] = useCarousel(itemChildren.length - 1, duration)
  const children = useMemo(
    () =>
      states.renderPages.map((page, index) => (
        <Presenter.CarouselListItem key={String(index)}>
          {itemChildren[page]}
        </Presenter.CarouselListItem>
      )),
    [itemChildren, states.renderPages],
  )
  const dotChildren = useMemo(
    () => (
      <DotList
        currentPage={states.currentPage}
        onClickDot={actions.onClickDot}
        lastIndex={states.lastIndex}
      />
    ),
    [actions.onClickDot, states.currentPage, states.lastIndex],
  )
  return (
    <Presenter.Carousel
      isChange={states.isChange}
      isDotChange={states.isDotChange}
      dotTranslate={states.dotTranslate}
      duration={duration}
      toTranslate={states.toTranslate}
      onClickBack={actions.onClickBack}
      onClickNext={actions.onClickNext}
      dotChildren={dotChildren}
    >
      {children}
    </Presenter.Carousel>
  )
}

export default Carousel
