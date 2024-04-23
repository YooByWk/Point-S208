// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import { HashRouter as Router } from "react-router-dom";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import AuthRouter from "../routers/AuthRouter";
import GlobalStyle from "../styles/global";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } =
    useTeamsUserCredential({
      initiateLoginEndpoint: config.initiateLoginEndpoint!,
      clientId: config.clientId!,
    });
  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <GlobalStyle />
        {loading ? (
          <Spinner style={{ margin: 100 }} />
        ) : (
          <Router>
            <AuthRouter />
          </Router>
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
