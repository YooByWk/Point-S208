/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { tokens } from '@fluentui/react-components'
import LargeButton from '@shared/LargeButton'

const MeetingShareSection = () => {
  const handleAdd = () => {}

  return (
    <>
      <div css={buttonCss}>
        <LargeButton text="내 명함 공유하기" width="90%" onClick={handleAdd} />
      </div>
    </>
  )
}

export default MeetingShareSection

const buttonCss = css`
  background-color: ${tokens.colorNeutralBackground1};
`
