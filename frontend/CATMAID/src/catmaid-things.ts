// CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}

import {CATMAID} from '@catmaid/catmaid-lib';

export class TracingTool {
  static goToNearestNeuronOrSkeleton(name, id) {
    return true;
  }
}

export class TracingOverlay {
  // @ts-ignore
  public static Settings = new CATMAID.Settings("name", {});
}

export class Init {
  static on(event, fn) {
    return true;
  }

  static off(event, fn) {
    return false;
  }
}
