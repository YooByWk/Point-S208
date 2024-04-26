// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
<<<<<<< HEAD
  
  tokens,
} from "@fluentui/react-components";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
=======
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
>>>>>>> 77353f4921c19c50e62742b4849d0f23376dc52a

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
<<<<<<< HEAD
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });
  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
=======
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
>>>>>>> 77353f4921c19c50e62742b4849d0f23376dc52a
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
<<<<<<< HEAD
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<Tab />} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
=======
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
>>>>>>> 77353f4921c19c50e62742b4849d0f23376dc52a
}
