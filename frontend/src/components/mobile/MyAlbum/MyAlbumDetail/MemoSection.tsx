/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Textarea, tokens } from '@fluentui/react-components'
import { useEffect, useState } from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { CardType } from '@/types/cardType'
import Spacing from '@/components/shared/Spacing'
import { useEditAlbumMemo } from '@/hooks/useEditAlbumMemo'
import { useParams } from 'react-router-dom'
import { userState } from '@/stores/user'
import { useRecoilValue } from 'recoil'
import {
  Dismiss20Filled,
  Edit20Regular,
  ArrowEnterLeft20Filled,
} from '@fluentui/react-icons'
import { useQueryClient } from '@tanstack/react-query'
import { ExternalCardType } from '@/types/ExternalCard'

interface MemoSectionProps {
  card: CardType | ExternalCardType
}

const MemoSection = ({ card }: MemoSectionProps) => {
  const teamId = useParams()?.teamAlbumId as unknown as number
  const userId = useRecoilValue(userState).userId as unknown as number
  const cardId = useParams()?.cardId as unknown as number
  const queryClient = useQueryClient()

  const memo = card.memo

  const [editvalue, setEditValue] = useState(memo)
  const [displayMemo, setDisplayMemo] = useState(memo)

  const [isEdit, setIsEdit] = useState(false)

  const editAlbumMutation = useEditAlbumMemo({
    userId: userId,
    teamAlbumId: teamId,
    cardId: card.cardId,
    data: { memo: editvalue },
  })

  const handleIconClick = () => {
    setIsEdit(!isEdit)
    setEditValue(memo)
  }

  const handleSaveClick = () => {
    setIsEdit(false)
    editAlbumMutation.mutate({ memo: editvalue })
    setDisplayMemo(editvalue)

    teamId
      ? queryClient.invalidateQueries({
          queryKey: ['fetchTeamCardDetail', userId, teamId, cardId],
        })
      : queryClient.invalidateQueries({
          queryKey: ['fetchAlbumCardDetail', userId, cardId],
        })
  }

  useEffect(() => {
    setEditValue(memo)
    setDisplayMemo(memo)
  }, [memo])

  return (
    <>
      <div css={memoBoxStyles}>
        {isEdit ? (
          <>
            <Textarea
              value={editvalue}
              onChange={e => setEditValue(e.target.value)}
              css={textInputCss}
            />
            <button onClick={handleSaveClick}>저장</button>
          </>
        ) : (
          <Text typography="t8" css={textInputCss}>
            {displayMemo ? displayMemo : '등록된 메모가 없습니다.'}
          </Text>
        )}
        <div css={iconCss}>
          {isEdit ? (
            <Flex>
              <ArrowEnterLeft20Filled />
              <Spacing direction="horizontal" size={8} />
              <Dismiss20Filled onClick={handleIconClick} />
            </Flex>
          ) : (
            <Edit20Regular onClick={handleIconClick} />
          )}
        </div>
      </div>
      <Spacing size={20} direction="vertical" />
    </>
  )
}

export default MemoSection

const memoBoxStyles = css`
  border-radius: 10px;
  background-color: ${tokens.colorNeutralBackground1Selected};
  margin: 20px;
  width: 90vw;
  min-height: 15vh;
  padding: 10px;
  overflow-y: scroll;
  position: relative;
`

const iconCss = css`
  position: absolute;
  top: 0;
  right: 0;
`

const textInputCss = css`
  margin-top: 10;
  width: 100%;
  height: 15vh;
  background-color: ${tokens.colorNeutralBackground1Selected};
`
