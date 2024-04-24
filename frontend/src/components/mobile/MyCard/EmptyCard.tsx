/** @jsxImportSource @emotion/react */
import { Card } from '@/components/shared/Card'
import * as s from './EmptyCard.styled'

const EmptyCard = () => {
  const children = () => {
    return <p css={s.text}>명함을 추가해 주세요</p>
  }

  return (
    <div css={s.container}>
      <Card text="80vw" children={children()} />
    </div>
  )
}

export default EmptyCard
