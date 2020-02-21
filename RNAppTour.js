import { findNodeHandle, NativeModules } from 'react-native'
import uuidv4 from 'uuid/v4'

const { RNAppTour } = NativeModules

class AppTour {
  static ShowSequence(sequence, onDismiss) {
    let appTourTargets = sequence.getAll()

    let viewIds = new Map(),
      sortedViewIds = [],
      props = {}

    appTourTargets &&
      appTourTargets.forEach((appTourTarget, key, appTourTargets) => {
        if (
          appTourTarget.props.order === undefined ||
          appTourTarget.props.order === null
        )
          throw new Error(
            'Each tour target should have a order mandatory props.'
          )

        viewIds.set(appTourTarget.props.order, appTourTarget.view)
        props[appTourTarget.view] = appTourTarget.props
      })

    let viewOrder = Array.from(viewIds.keys())
    viewOrder = viewOrder.sort((a, b) => a - b)

    viewOrder.forEach(vOrder => {
      sortedViewIds.push(viewIds.get(vOrder))
    })

    RNAppTour.ShowSequence(sortedViewIds, props, sequence._id)
    if (onDismiss) {
      RNAppTour.addListener('onFinishSequenceEvent', function() {
        RNAppTour.removeListener(this)
        onDismiss()
      })
    }
  }

  static ShowFor(appTourTarget) {
    RNAppTour.ShowFor(appTourTarget.view, appTourTarget.props)
  }

  static CancelSequence(appTourSequence) {
    return RNAppTour.Cancel(appTourSequence._id)
  }
}

class AppTourSequence {
  constructor() {
    this._id = uuidv4()
    this.appTourTargets = new Map()
  }

  add(appTourTarget) {
    this.appTourTargets.set(appTourTarget.key, appTourTarget)
  }

  remove(appTourTarget) {
    this.appTourTargets.delete(appTourTarget.key)
  }

  removeAll() {
    this.appTourTargets = new Map()
  }

  get(appTourTarget) {
    return this.appTourTargets.get(appTourTarget)
  }

  getAll() {
    return this.appTourTargets
  }

  cancel() {
    return AppTour.CancelSequence(this)
  }
}

class AppTourView {
  static for(view, key, props) {
    if (view === undefined || view === null)
      throw new Error(
        'Provided tour view reference is undefined or null, please add a preliminary validation before adding for tour.'
      )

    return {
      key,
      view: findNodeHandle(view),
      props
    }
  }
}

export { AppTourView, AppTourSequence, AppTour }
