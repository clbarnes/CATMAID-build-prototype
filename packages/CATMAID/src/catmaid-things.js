// CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}

import {CATMAID} from 'catmaid-lib';

export class TracingTool {
  static goToNearestNeuronOrSkeleton(name, id) {
    return true;
  }
}

export class TracingOverlay {
  Settings = new CATMAID.Settings("name", {});
}

export class Init {
  on(event, fn) {
    return true;
  }

  off(event, fn) {
    return false;
  }
}
