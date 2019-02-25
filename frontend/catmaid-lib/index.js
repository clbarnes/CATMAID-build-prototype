// global: project, SkeletonAnnotations, CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}, glWidget?, CATMAID_CLIENT_VERSION

import * as catmaid from "./src/CATMAID.js";
export let requestQueue = catmaid.requestQueue;

import * as tools from "./src/tools.js";
import * as events from "./src/events.js";
import * as request from "./src/request.js";
import * as error from "./src/error.js";
import * as state from "./src/state.js";
import * as command from "./src/command.js";
import * as annotations from "./src/models/annotations.js";
import * as api from "./src/models/api.js";
import * as connectors from "./src/models/connectors.js";
import * as dataview from "./src/models/dataview.js";
import * as group from "./src/models/group.js";
import * as labels from "./src/models/labels.js";
import * as landmarks from "./src/models/landmarks.js";
import * as neuron from "./src/models/neuron.js";
import * as nodes from "./src/models/nodes.js";
import * as pointcloud from "./src/models/pointcloud.js";
import * as pointset from "./src/models/pointset.js";
import * as relations from "./src/models/relations.js";
import * as sampler from "./src/models/sampler.js";
import * as similarity from "./src/models/similarity.js";
import * as skeleton from "./src/models/skeleton.js";
import * as volumes from "./src/models/volumes.js";
import * as skeleton_source from "./src/skeleton_source.js";
import * as datastores from "./src/datastores.js";
import * as settings_manager from "./src/settings-manager.js";
import * as coalescing_promise_deduplicator from "./src/coalescing-promise-deduplicator.js";
import * as color_source from "./src/color-source.js";
import * as colorizer from "./src/colorizer.js";
import * as connectivity_matrix from "./src/connectivity_matrix.js";
import * as constants from "./src/constants.js";
import * as cropping from "./src/cropping.js";
import * as filter from "./src/filter.js";
import * as index from "./index.js";
import * as io from "./src/io.js";
import * as lru_cache from "./src/lru-cache.js";
import * as moving_least_squares_transform from "./src/moving-least-squares-transform.js";
import * as neuron_name_service from "./src/neuron_name_service.js";
import * as serializer from "./src/serializer.js";
import * as shader from "./src/shader.js";
import * as skeleton_operations from "./src/skeleton-operations.js";
import * as skeleton_source_manager from "./src/skeleton_source_manager.js";
import * as submitter from "./src/submitter.js";
import * as svg_factory from "./src/svg-factory.js";
import * as svgutil from "./src/svgutil.js";
import * as time_series from "./src/time-series.js";
import * as workflow from "./src/workflow.js";

const module_objs = [
  catmaid,
  events,
  request,
  error,
  state,
  command,
  annotations,
  api,
  connectors,
  dataview,
  group,
  labels,
  landmarks,
  neuron,
  nodes,
  pointcloud,
  pointset,
  relations,
  sampler,
  similarity,
  skeleton,
  volumes,
  skeleton_source,
  datastores,
  settings_manager,
  coalescing_promise_deduplicator,
  color_source,
  colorizer,
  connectivity_matrix,
  constants,
  cropping,
  filter,
  index,
  io,
  lru_cache,
  moving_least_squares_transform,
  neuron_name_service,
  serializer,
  shader,
  skeleton_operations,
  skeleton_source_manager,
  submitter,
  svg_factory,
  svgutil,
  time_series,
  workflow
];

// todo: this might break introspection?
export var CATMAID = module_objs.reduce((accumulator, currentValue) => {
  const prefix = "CATMAID_";
  for (let [key, value] of Object.entries(currentValue)) {
    if (key.startsWith(prefix)) {
      accumulator[key.slice(prefix.length)] = value;
    }
  }
  return accumulator;
}, {});

CATMAID.tools = tools;

let singleton;

Object.defineProperty(CATMAID, "skeletonListSources", {
  get: () => {
    if (!singleton) {
      singleton = new skeleton_source_manager.CATMAID_SkeletonSourceManager();
    }
    return singleton;
  }
});

export {CircuitGraphAnalysis} from "./src/circuit_graph_analysis.js";

export {InstanceRegistry, fetchSkeletons} from "./src/utils.js";

import * as d3 from "./vendor/d3/d3.v3.min";
export {d3}
