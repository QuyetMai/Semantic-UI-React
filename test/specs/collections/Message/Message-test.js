import faker from 'faker'
import React from 'react'
import { Simulate } from 'react-addons-test-utils'

import Message from 'src/collections/Message/Message'
import * as common from 'test/specs/commonTests'

describe('Message', () => {
  common.isConformant(Message)
  common.hasUIClassName(Message)
  common.rendersChildren(Message)

  describe('with header', () => {
    it('has a header', () => {
      const header = faker.hacker.phrase()
      const message = deprecatedRender(<Message header={header} />)

      message.findClass('sd-message-header')
      message.assertText(header)
    })
  })
  describe('without header', () => {
    it('has no header', () => {
      deprecatedRender(<Message />)
        .scryClass('sd-message-header')
        .should.have.a.lengthOf(0)
    })
  })
  describe('with icon', () => {
    it('has an icon', () => {
      deprecatedRender(<Message icon='inbox' />).findClass('sd-message-icon')
    })
    it('has a "content" wrapper', () => {
      deprecatedRender(<Message icon='inbox' />).findClass('sd-message-content')
    })
  })
  describe('without icon', () => {
    it('has no icon', () => {
      deprecatedRender(<Message />)
        .scryClass('sd-message-icon')
        .should.have.a.lengthOf(0)
    })
    it('has no "content" wrapper', () => {
      deprecatedRender(<Message />)
        .scryClass('sd-message-content')
        .should.have.a.lengthOf(0)
    })
  })
  describe('dismissable', () => {
    it('adds a close icon', () => {
      deprecatedRender(<Message dismissable />).findClass('sd-message-close-icon')
    })

    it('calls transition "fade" when dismissed', () => {
      const tree = deprecatedRender(<Message dismissable />)
      const message = tree.first()
      const closeIcon = tree.findClass('sd-message-close-icon')

      message.messageElm.transition.called.should.equal(false)
      Simulate.click(closeIcon)
      message.messageElm.transition.calledWith('fade').should.equal(true)
    })
  })
  describe('not dismissable', () => {
    it('has no close icon', () => {
      deprecatedRender(<Message />)
        .scryClass('sd-message-close-icon')
        .should.have.a.lengthOf(0)
    })
  })
})