import React, { useMemo } from 'react'

import * as Presenter from './ImagePresenter'

type Props = Pick<React.ComponentProps<'img'>, 'src' | 'alt' | 'loading'> & {
  aspectRatio?: {
    widthRatio: number
    heightRatio: number
  }
  absoluteChildren?: React.ReactNode
}
const BaseRatio = {
  widthRatio: 4,
  heightRatio: 3,
} as const
const Image: React.VFC<Props> = props => {
  const { aspectRatio = BaseRatio, absoluteChildren, src, alt, loading } = props
  const top = useMemo(() => {
    const { widthRatio, heightRatio } = aspectRatio
    return (100 / widthRatio) * heightRatio
  }, [aspectRatio])
  return (
    <Presenter.Image top={top} src={src} alt={alt} loading={loading}>
      {absoluteChildren}
    </Presenter.Image>
  )
}
export default Image
