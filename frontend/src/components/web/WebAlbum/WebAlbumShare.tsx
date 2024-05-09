/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  Button,
  DialogContent,
  DialogActions,
  DialogTriggerChildProps,
} from '@fluentui/react-components'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { shareCard } from '@/apis/album'
import { selectedCardState } from '@/stores/card'
import { colors } from '@/styles/colorPalette'
import TextField from '@/components/shared/TextField'
import { ChangeEvent, useCallback, useState } from 'react'
import { ARIAButtonType } from '@fluentui/react-aria'
import { ExternalCardType } from '@/types/ExternalCard'
import { CardType } from '@/types/cardType'
import { shareMyCard } from '@/apis/card'
import { userState } from '@/stores/user'

const WebAlbumShare = ({
  card,
  isDigital = false,
  children,
}: {
  card: ExternalCardType | CardType
  isDigital?: boolean
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | ((
        props: DialogTriggerChildProps<ARIAButtonType, {}>,
      ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>)
    | null
    | undefined
}) => {
  const [inputEmail, setInputEmail] = useState('')
  const userId = useRecoilValue(userState).userId

  const { mutate } = useMutation({
    mutationKey: isDigital ? ['shareMyCard'] : ['shareCard'],
    mutationFn: isDigital ? shareMyCard : shareCard,
    onSuccess(result) {
      console.log('공유 성공', result)
    },
    onError(error) {
      console.error('공유 실패:', error)
    },
  })

  const handleShare = async () => {
    isDigital
      ? mutate({ id: userId, email: inputEmail })
      : mutate({ id: card.cardId, email: inputEmail })
    alert('이메일을 전송하였습니다.')
  }

  const handleEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value)
  }, [])

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>{children}</DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>공유 방식 선택</DialogTitle>
          <DialogContent>
            <Dialog>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  shape="circular"
                  disabled={
                    !isDigital &&
                    !(Boolean(card.realPicture) && card.realPicture.length > 0)
                  }
                >
                  이메일
                </Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>수신자 정보를 입력해주세요.</DialogTitle>
                  <DialogContent>
                    <TextField
                      placeholder="gdhong@poscointl.com"
                      onChange={handleEmailInput}
                    />
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button shape="circular" onClick={handleShare}>
                        보내기
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger disableButtonEnhancement>
                      <Button shape="circular" css={buttonStyles2}>
                        취소
                      </Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button shape="circular" css={buttonStyles2}>
                취소
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default WebAlbumShare

const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
