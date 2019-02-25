// project, SkeletonAnnotations, CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}, glWidget?, CATMAID_CLIENT_VERSION

import {SkeletonAnnotations} from "./src/skeleton-annotations";
import {TracingTool, TracingOverlay, Init} from "./src/catmaid-things";
import {
  CATMAID,
  CircuitGraphAnalysis,
  fetchSkeletons,
  InstanceRegistry,
  requestQueue,
} from "@catmaid/catmaid-lib";
import {Arbor, SynapseClustering} from "@catmaid/arbor";

CATMAID.TracingTool = TracingTool;
CATMAID.TracingOverlay = TracingOverlay;
CATMAID.Init = Init;

declare global {
  interface Window {
    SkeletonAnnotations: any,
    project: number,
    CATMAID_CLIENT_VERSION: string,
    glWidget: object,
    CATMAID: any,
    requestQueue: any,
    Arbor: any,
    CircuitGraphAnalysis: any,
    SynapseClustering: any,
    InstanceRegistry: any,
    fetchSkeletons: any
  }
}

window.SkeletonAnnotations = SkeletonAnnotations;
window.project = 10;
window.CATMAID_CLIENT_VERSION = "1.1.1";
window.glWidget = {};
window.CATMAID = CATMAID;
window.requestQueue = requestQueue;
window.Arbor = Arbor;
window.CircuitGraphAnalysis = CircuitGraphAnalysis;
window.SynapseClustering = SynapseClustering;
window.InstanceRegistry = InstanceRegistry;
window.fetchSkeletons = fetchSkeletons;
