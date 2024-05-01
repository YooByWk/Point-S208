// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from '@fluentui/react-components'
import { HashRouter as Router } from 'react-router-dom'
import { useData, useTeamsUserCredential } from '@microsoft/teamsfx-react'
import { TeamsFxContext } from './Context'
import config from './sample/lib/config'
import { useRecoilState, useSetRecoilState } from 'recoil'
import AuthRouter from '@/routers/AuthRouter'
import { themeState } from '@/stores/common'
import { useEffect, useState } from 'react'
import { userState } from '@/stores/user'
import { customLightTheme, customDarkTheme } from '@/styles/colorRamp'
import Tutorial from './Tutorial'

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } =
    useTeamsUserCredential({
      initiateLoginEndpoint: config.initiateLoginEndpoint!,
      clientId: config.clientId!,
    })
  const setTheme = useSetRecoilState(themeState)
  const [user, setUser] = useRecoilState(userState)
  const [isUserInfoinLocal, setIsUserInfoinLocal] = useState(true)

  useEffect(() => {
    setTheme(themeString)
  }, [setTheme, themeString])

  useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo()
      setUser({
        name: userInfo.displayName,
        email: userInfo.preferredUserName,
      })

      if (!user.userId) {
        setIsUserInfoinLocal(false)
      }
      
    }
  })

  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === 'dark'
            ? { ...customDarkTheme, colorNeutralBackground1: '#1f1f1f' }
            : themeString === 'contrast'
            ? teamsHighContrastTheme
            : {
                ...customLightTheme,
                // colorNeutralBackground1: '#',
                colorNeutralBackground3: '#eeeeee',
              }
        }
        style={{ background: tokens.colorNeutralBackground1 }}
      >
        {loading ? (
          <Spinner style={{ margin: 100 }} />
        ) : isUserInfoinLocal ? (
          <Router>
            <AuthRouter />
          </Router>
        ) : (
          <Tutorial value={isUserInfoinLocal} setValue={setIsUserInfoinLocal} />
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  )
}
