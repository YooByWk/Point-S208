// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from '@fluentui/react-components'
import { HashRouter as Router } from 'react-router-dom'
import { useData, useTeamsUserCredential } from '@microsoft/teamsfx-react'
import { TeamsFxContext } from './Context'
import config from './sample/lib/config'
import { useSetRecoilState } from 'recoil'
import AuthRouter from '@/routers/AuthRouter'
import { themeState } from '@/stores/common'
import { useEffect } from 'react'
import { userState } from '@/stores/user'
import { customLightTheme, customDarkTheme } from '@/styles/colorRamp'

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
  const setUser = useSetRecoilState(userState)

  useEffect(() => {
    setTheme(themeString)
  }, [setTheme, themeString])

  useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo()
      setUser({ name: userInfo.displayName, email: userInfo.preferredUserName })
    }
  })

  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === 'dark'
            ? customDarkTheme
            : themeString === 'contrast'
            ? teamsHighContrastTheme
            : {
                ...customLightTheme,
                colorNeutralBackground3: '#eeeeee',
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        {loading ? (
          <Spinner style={{ margin: 100 }} />
        ) : (
          <Router>
            <AuthRouter />
          </Router>
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  )
}
