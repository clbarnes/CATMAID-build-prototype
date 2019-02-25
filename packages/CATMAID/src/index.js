// project, SkeletonAnnotations, CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}, glWidget?, CATMAID_CLIENT_VERSION

import {SkeletonAnnotations} from "./skeleton-annotations";
import {CATMAID} from "catmaid-lib";

CATMAID.TracingTool = TracingTool;
CATMAID.TracingOverlay = TracingOverlay;
CATMAID.Init = Init;

for (let obj in [window, global]) {
  if (obj) {
    obj.SkeletonAnnotations = SkeletonAnnotations;
    obj.project = 10;
    obj.CATMAID_CLIENT_VERSION = "1.1.1";
    obj.glWidget = {};
  }
}
