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
import { useTeamsUserCredential } from '@microsoft/teamsfx-react'
import { TeamsFxContext } from './Context'
import config from './sample/lib/config'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useWindowSize from '../hooks/useWindowSize'
import DesktopRouter from '../routers/DesktopRouter'
import MobileRouter from '../routers/MobileRouter'

const queryClient = new QueryClient()

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
  const width = useWindowSize()

  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <FluentProvider
            theme={
              themeString === 'dark'
                ? teamsDarkTheme
                : themeString === 'contrast'
                ? teamsHighContrastTheme
                : {
                    ...teamsLightTheme,
                    colorNeutralBackground3: '#eeeeee',
                  }
            }
            style={{ background: tokens.colorNeutralBackground3 }}
          >
            {loading ? (
              <Spinner style={{ margin: 100 }} />
            ) : (
              <Router>
                {width >= 768 ? <DesktopRouter /> : <MobileRouter />}
              </Router>
            )}
          </FluentProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </TeamsFxContext.Provider>
  )
}
