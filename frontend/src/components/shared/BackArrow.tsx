/** @jsxImportSource @emotion/react */
import { ArrowLeft24Regular } from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import Flex from '@/components/shared/Flex'
import Text from '@shared/Text'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'

interface BackArrowProps {
  onClick?: () => void
}

/**
 *
 * @returns 뒤로가기 버튼
 */
const BackArrow = ({ onClick }: BackArrowProps) => {
  const navigate = useNavigate()
  const handleBackArrow = (e: any) => {
    if (onClick) {
      onClick()
      return
    }
    e.stopPropagation()
    navigate(-1)
  }

  return (
    <div css={topContainer}>
      <Spacing size={10} direction="vertical" />
      <Flex direction="row" align="center" css={container}>
        <Spacing size={10} direction="horizontal" />
        <ArrowLeft24Regular onClick={handleBackArrow} />
        <Spacing size={10} direction="horizontal" onClick={handleBackArrow} />
        <Text typography="t7" onClick={handleBackArrow}>
          뒤로가기
        </Text>
      </Flex>
      <Spacing size={5} direction="vertical" />
    </div>
  )
}

export default BackArrow

const topContainer = css`
  margin-top: 10px;
  margin-left: 15px;
`

const container = css`
  cursor: pointer;
`
