/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as microsoftTeams from '@microsoft/teams-js'
import { useEffect, useState } from 'react'

import {
  mergeClasses,
  Title2,
  Subtitle2,
  Spinner,
} from '@fluentui/react-components'
import { getFlexColumnStyles } from '@/components/shared/layouts'
import { useTeamsUserCredential } from '@microsoft/teamsfx-react'
import config from '@/components/sample/lib/config'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { themeState } from '@/stores/common'
import { isUserinStorageState } from '@/stores/user'
import Tutorial from '@/components/Tutorial'

const Meeting = () => {
  const [appTheme, setAppTheme] = useState('')
  const isUserinStorage = useRecoilValue(isUserinStorageState)

  useEffect(() => {
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.app.getContext().then(context => {
        // Applying default theme from app context property
        switch (context.app.theme) {
          case 'dark':
            setAppTheme('theme-dark')
            break
          case 'default':
            setAppTheme('theme-light')
            break
          case 'contrast':
            setAppTheme('theme-contrast')
            break
          default:
            return setAppTheme('theme-light')
        }
      })
      microsoftTeams.pages.config.registerOnSaveHandler(function (saveEvent) {
        microsoftTeams.pages.config.setConfig({
          suggestedDisplayName: 'BizCard',
          contentUrl: `${window.location.origin}/index.html#/sidepanel`,
        })
        saveEvent.notifySuccess()
      })

      microsoftTeams.pages.config.setValidityState(true)
    })
  }, [])

  const flexColumnStyles = getFlexColumnStyles()
  return (
    <>
      {isUserinStorage ? (
        <>
          <div className={appTheme}>
            <div
              className={mergeClasses(
                flexColumnStyles.root,
                flexColumnStyles.hAlignCenter,
                flexColumnStyles.vAlignCenter,
                flexColumnStyles.fill,
                flexColumnStyles.smallGap,
              )}
            >
              <Title2 block align="center">
                BizCard에 오신걸 환영합니다!
              </Title2>
              <Subtitle2 block align="center">
                아래 저장 버튼을 눌러서 계속 하세요.
              </Subtitle2>
            </div>
          </div>
        </>
      ) : (
        <Tutorial />
      )}
    </>
  )
}

export default Meeting
