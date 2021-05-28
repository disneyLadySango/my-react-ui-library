import React from 'react'
import styled from 'styled-components'

const StyledImageWrapper = styled.div<{ top: number }>`
  position: relative;
  overflow: hidden;
  padding-top: ${props => props.top}%;
`
const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
`
type Props = Pick<React.ComponentProps<'img'>, 'src' | 'alt' | 'loading'> & {
  top: number
  children?: React.ReactNode
}
export const Image: React.VFC<Props> = ({
  top,
  children,
  src,
  alt,
  loading = 'lazy',
}) => (
  <StyledImageWrapper top={top}>
    <StyledImage src={src} alt={alt} loading={loading} />
    {children}
  </StyledImageWrapper>
)
