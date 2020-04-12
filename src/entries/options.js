import browser from '../lib/browser-api'
import { h, app } from 'hyperapp'

import * as AccountsComponent from '../lib/components/Accounts'
import * as NewAccountComponent from '../lib/components/NewAccount'
import * as AccountOptionsComponent from '../lib/components/AccountOptions'
import * as PickerComponent from '../lib/components/Picker'
import * as SetupKeyComponent from '../lib/components/SetupKey'
import * as UnlockComponent from '../lib/components/Unlock'
import * as FundingComponent from '../lib/components/Funding'
import * as UpdateComponent from '../lib/components/Update'

const Accounts = AccountsComponent.Component
const NewAccount = NewAccountComponent.Component
const AccountOptions = AccountOptionsComponent.Component
const Picker = PickerComponent.Component
const SetupKey = SetupKeyComponent.Component
const Unlock = UnlockComponent.Component
const Funding = FundingComponent.Component
const Update = UpdateComponent.Component

const state = {
  view: {
    current: 'accounts' // accounts | picker | setupKey | unlock | newAccount | funding | update
  }
}

const actions = {
  view: {
    switch: view => ({ current: view })
  },
  switchView: newView => async (state, actions) => {
    const background = await browser.runtime.getBackgroundPage()
    if (!background.controller.unlocked) {
      actions.view.switch('unlock')
      return
    }
    if (newView === 'accounts') {
      await actions.accounts.load()
    }
    actions.view.switch(newView)
  },
  init: () => async (state, actions) => {
    if (window.location.hash === '#updated') {
      actions.switchView('update')
      return
    }
    actions.switchView('accounts')
  },
  getState: () => state => state
}

function render(state, actions) {
  return (
    <div>
      {[
        <Accounts />,
        state.view.current === 'picker' ? (
          <Picker />
        ) : state.view.current === 'newAccount' ? (
          <NewAccount />
        ) : state.view.current === 'options' ? (
          <AccountOptions />
        ) : state.view.current === 'unlock' ? (
          <Unlock />
        ) : state.view.current === 'setupKey' ? (
          <SetupKey />
        ) : state.view.current === 'funding' ? (
          <Funding />
        ) : state.view.current === 'update' ? (
          <Update />
        ) : (
          ''
        )
      ]}
    </div>
  )
}

// setup App

const components = [
  AccountsComponent,
  NewAccountComponent,
  AccountOptionsComponent,
  PickerComponent,
  UnlockComponent,
  SetupKeyComponent,
  FundingComponent,
  UpdateComponent
]

const appState = Object.assign.apply(
  Object,
  [{}, state].concat(components.map(comp => comp.state))
)
const appActions = Object.assign.apply(
  Object,
  [{}, actions].concat(components.map(comp => comp.actions))
)

let rootNode = document.querySelector('#app')
window.app = app(appState, appActions, render, rootNode)
window.app.init()
;(async () => {
  const background = await browser.runtime.getBackgroundPage()
  const unregister = background.controller.onStatusChange(() =>
    window.app.accounts.load()
  )
  window.addEventListener('beforeunload', unregister)
  window.addEventListener('unload', unregister)
  window.addEventListener('close', unregister)
})()
