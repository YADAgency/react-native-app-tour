import React from 'react'
import { findNodeHandle } from 'react-native'

type AppTourTarget = {
  key: React.Key
  view: number
  props: AppTourTargetProps
}

type AppTourTargetProps = {
  title: string
  description: string
  outerCircleColor: string
  targetCircleColor: string
  titleTextColor: string
  descriptionTextColor: string
  textColor: string
  dimColor: string
  fontFamily: string
  outerCircleAlpha: number
  titleTextSize: number
  descriptionTextSize: number
  drawShadow: boolean
  cancelable: boolean
  tintTarget: boolean
  transparentTarget: boolean
  targetRadius: number
}

declare class AppTour {
  static ShowSequence(sequence: AppTourSequence): void
  static ShowFor(appTourTarget: AppTourTarget): void
}

declare class AppTourSequence {
  private appTourTargets: Map<React.Key, AppTourTarget>

  add(appTourTarget: AppTourTarget): void
  remove(appTourTarget: AppTourTarget): void
  removeAll(): void
  get(appTourTarget: React.Key): AppTourTarget
  getAll(): Map<React.Key, AppTourTarget>
}

declare class AppTourView {
  static for(
    view: null | number | React.Component<any, any> | React.ComponentClass<any>,
    key: React.Key,
    props: AppTourTargetProps
  ): AppTourTarget
}

export { AppTour, AppTourSequence, AppTourView }