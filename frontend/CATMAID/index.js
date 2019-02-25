// project, SkeletonAnnotations, CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}, glWidget?, CATMAID_CLIENT_VERSION

import {SkeletonAnnotations} from "./src/skeleton-annotations";
import {TracingTool, TracingOverlay, Init} from "./src/catmaid-things";
import {
  CATMAID,
  CircuitGraphAnalysis,
  fetchSkeletons,
  InstanceRegistry,
  requestQueue,
} from "../catmaid-lib";
import {Arbor, SynapseClustering} from "@catmaid/arbor";

CATMAID.TracingTool = TracingTool;
CATMAID.TracingOverlay = TracingOverlay;
CATMAID.Init = Init;

for (let obj of [window, global]) {
  if (obj) {
    obj.SkeletonAnnotations = SkeletonAnnotations;
    obj.project = 10;
    obj.CATMAID_CLIENT_VERSION = "1.1.1";
    obj.glWidget = {};
    obj.CATMAID = CATMAID;
    obj.requestQueue = requestQueue;
    obj.Arbor = Arbor;
    obj.CircuitGraphAnalysis = CircuitGraphAnalysis;
    obj.SynapseClustering = SynapseClustering;
    obj.InstanceRegistry = InstanceRegistry;
    obj.fetchSkeletons = fetchSkeletons;
  }
}
