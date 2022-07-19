import * as React from "react";
import { Admin, Resource } from 'react-admin';
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import PluginEditor from "./editors/PluginEditor";
import PluginList from "./lists/PluginList";
import LoginPage from "./pages/LoginPage";

const App = () => (
    <Admin theme={{palette: { mode: "dark" }}} dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage} disableTelemetry requireAuth={false}>
      <Resource name="plugins" list={PluginList} edit={PluginEditor}/>
    </Admin>
  )

export default App;
