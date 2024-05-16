/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components'
import { css } from '@emotion/react'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import Flex from '@/components/shared/Flex'
const ResModal = () => {
  return (
    <Dialog modalType="alert">
      <DialogSurface css={surface}>
        <DialogBody css={body}>
          <DialogContent css={content}>
            <Text typography="t9">이메일을 전송했습니다.</Text>
            <Spacing size={20} direction="vertical" />
            {
              <Flex direction="row" align="center" justify="center">
                <DialogActions css={fui}>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary">{'확인'}</Button>
                  </DialogTrigger>
                </DialogActions>
              </Flex>
            }
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default ResModal

const fui = css`
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;
`

const body = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: fit-content;
  padding: 0;
  margin: 0;
`

const surface = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
`

const content = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
  padding: 0;
  margin: 0;
`
