import { useState, useMemo, useCallback } from 'react'

const tranlateParam = {
  next: -1,
  back: 1,
}

const defaultDotTranslate = {
  fromTranslate: 0,
  toTranslate: 100
}

const createDotTranslate = (currentPage: number, lastIndex: number, newPage: number) => {
  if (lastIndex <= 5) return defaultDotTranslate
  // 80px === 100%
  // 最大の%値
  const maxValue = (lastIndex / 5) * 100
  // 現在の%値は
  
  console.log(currentPage, newPage)
  return { ...defaultDotTranslate, toTranlate: maxValue }
}

const setBackPage = (currentPage: number, lastIndex: number) =>
  currentPage === 0 ? lastIndex : currentPage - 1

const setNextPage = (currentPage: number, lastIndex: number) =>
  currentPage === lastIndex ? 0 : currentPage + 1

/**
 * @description カルーセルアニメーションのtransition ミリ秒単位
 */
type DurationType = number
/**
 * カルーセルのカスタムフック
 * I/Oの管理を行っている
 */
export const useCarousel = (lastIndex: number, duration: DurationType) => {
  // 現在位置
  const [currentPage, setCurrentPage] = useState<number>(0)
  // 変更中かどうか
  const [isChange, setIsChange] = useState<boolean>(false)
  // アニメーション
  const [toTranslate, setToTranslate] = useState<number>(0)
  // カルーセルの前後表示
  const [renderPages, setRenderPages] = useState([
    setBackPage(currentPage, lastIndex),
    currentPage,
    setNextPage(currentPage, lastIndex),
  ])
  // dotのアニメーション
  const [dotTranslate, setDotTranslate] = useState(defaultDotTranslate)

  const onChangePage = useCallback(
    (page: number): void => {
      // 変更中は何も受け付けない
      if (isChange) return undefined
      setIsChange(true)
      setTimeout(() => {
        const backPage = setBackPage(page, lastIndex)
        const nextPage = setNextPage(page, lastIndex)
        setCurrentPage(page)
        setIsChange(false)
        setRenderPages([backPage, page, nextPage])
      }, duration)
      return undefined
    },
    [isChange, duration, lastIndex],
  )

  const onClickNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      setToTranslate(duration * tranlateParam.next)
      onChangePage(lastIndex === currentPage ? 0 : currentPage + 1)
    },
    [duration, onChangePage, lastIndex, currentPage],
  )

  const onClickBack = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      setToTranslate(duration * tranlateParam.back)
      onChangePage(currentPage === 0 ? lastIndex : currentPage - 1)
    },
    [currentPage, duration, lastIndex, onChangePage],
  )

  const onClickDot = useCallback(
    (page: number): void => {
      if (page === currentPage) return undefined
      const isBack = page - currentPage < 0
      const translate =
        (isBack ? tranlateParam.back : tranlateParam.next) * duration
      const pages = isBack
        ? [page, renderPages[1], renderPages[2]]
        : [renderPages[0], renderPages[1], page]
      setToTranslate(translate)
      setDotTranslate(createDotTranslate(currentPage, lastIndex, page))
      setRenderPages(pages)
      onChangePage(page)
      return undefined
    },
    [currentPage, duration, lastIndex, onChangePage, renderPages],
  )

  const isDotChange = useMemo(() => isChange && lastIndex >= 5, [isChange, lastIndex])

  return [
    {
      currentPage,
      renderPages,
      isChange,
      isDotChange,
      toTranslate,
      lastIndex,
      dotTranslate,
    },
    {
      onClickDot,
      onClickNext,
      onClickBack,
    },
  ] as const
}
