import {Logout} from '../auth'

import './styles.css'

function Settings() {
  return (
    <div className="settings__outer">
        <h3>Settings</h3>
        <Logout />
    </div>
  )
}

export default Settings