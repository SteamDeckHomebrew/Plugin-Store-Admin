import * as React from "react";
import { Admin, Resource } from 'react-admin';
import PluginIcon from '@mui/icons-material/Extension';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import authProvider from "./authProvider";
import dataProvider from "./pluginDataProvider";
import PluginEditor from "./editors/PluginEditor";
import PluginList from "./lists/PluginList";
import AnnouncementEditor, { AnnouncementCreator } from "./editors/AnnouncementEditor";
import AnnouncementList from "./lists/AnnouncementList";
import LoginPage from "./pages/LoginPage";

const App = () => (
    <Admin theme={{palette: { mode: "dark" }}} dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage} disableTelemetry requireAuth={false}>
      <Resource name="plugins" icon={PluginIcon} list={PluginList} edit={PluginEditor}/>
      <Resource name="announcements" icon={AnnouncementIcon} list={AnnouncementList} edit={AnnouncementEditor} create={AnnouncementCreator}/>
    </Admin>
  )

export default App;
