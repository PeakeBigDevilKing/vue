/* @flow */

import {
  getBindingAttr
} from 'compiler/helpers'

function parse (el: ASTElement) {
  let transition = getBindingAttr(el, 'transition')
  if (transition === '""') {
    transition = true
  }
  if (transition) {
    el.transition = transition
  }
  const mode = getBindingAttr(el, 'transition-mode')
  if (mode) {
    el.transitionMode = mode
  }
}

function genData (el: ASTElement): string {
  return el.transition
    ? `transition:${el.transition},`
    : ''
}

function transformElement (el: ASTElement, code: string): string {
  return el.transitionMode
    ? `_h(_e('TransitionControl',{props:{mode:${
        el.transitionMode
      },child:${code}}}))`
    : code
}

export default {
  parse,
  genData,
  transformElement
}