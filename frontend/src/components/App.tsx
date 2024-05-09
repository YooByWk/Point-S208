// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from '@fluentui/react-components'
import { HashRouter as Router } from 'react-router-dom'
import { useTeamsUserCredential } from '@microsoft/teamsfx-react'
import { TeamsFxContext } from './Context'
import config from './sample/lib/config'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import AuthRouter from '@/routers/AuthRouter'
import { themeState } from '@/stores/common'
import { useEffect } from 'react'
import { isUserinStorageState } from '@/stores/user'
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
  const isUserinStorage = useRecoilValue(isUserinStorageState)

  useEffect(() => {
    setTheme(themeString)
  }, [setTheme, themeString])

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
        ) : isUserinStorage ? (
          <Router>
            <AuthRouter />
          </Router>
        ) : (
          <Tutorial />
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  )
}
