// global: project, SkeletonAnnotations, CATMAID.{TracingTool, TracingOverlay, Init, skeletonListSources}, glWidget?, CATMAID_CLIENT_VERSION

import * as catmaid from "./CATMAID.js";
export let requestQueue = catmaid.requestQueue;

import * as tools from "./tools.js";
import * as events from "./events.js";
import * as request from "./request.js";
import * as error from "./error.js";
import * as state from "./state.js";
import * as command from "./command.js";
import * as annotations from "./models/annotations.js";
import * as api from "./models/api.js";
import * as connectors from "./models/connectors.js";
import * as dataview from "./models/dataview.js";
import * as group from "./models/group.js";
import * as labels from "./models/labels.js";
import * as landmarks from "./models/landmarks.js";
import * as neuron from "./models/neuron.js";
import * as nodes from "./models/nodes.js";
import * as pointcloud from "./models/pointcloud.js";
import * as pointset from "./models/pointset.js";
import * as relations from "./models/relations.js";
import * as sampler from "./models/sampler.js";
import * as similarity from "./models/similarity.js";
import * as skeleton from "./models/skeleton.js";
import * as volumes from "./models/volumes.js";
import * as skeleton_source from "./skeleton_source.js";
import * as datastores from "./datastores.js";
import * as settings_manager from "./settings-manager.js";
import * as coalescing_promise_deduplicator from "./coalescing-promise-deduplicator.js";
import * as color_source from "./color-source.js";
import * as colorizer from "./colorizer.js";
import * as connectivity_matrix from "./connectivity_matrix.js";
import * as constants from "./constants.js";
import * as cropping from "./cropping.js";
import * as filter from "./filter.js";
import * as index from "./index.js";
import * as io from "./io.js";
import * as lru_cache from "./lru-cache.js";
import * as moving_least_squares_transform from "./moving-least-squares-transform.js";
import * as neuron_name_service from "./neuron_name_service.js";
import * as serializer from "./serializer.js";
import * as shader from "./shader.js";
import * as skeleton_operations from "./skeleton-operations.js";
import * as skeleton_source_manager from "./skeleton_source_manager.js";
import * as submitter from "./submitter.js";
import * as svg_factory from "./svg-factory.js";
import * as svgutil from "./svgutil.js";
import * as time_series from "./time-series.js";
import * as workflow from "./workflow.js";

const module_objs = [
  catmaid,
  tools,
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
export const CATMAID = module_objs.reduce((accumulator, currentValue) => {
  const prefix = "CATMAID_";
  for (let [key, value] of currentValue.entries()) {
    if (key.startsWith(prefix)) {
      accumulator[key.slice(prefix.length)] = value;
    }
  }
}, {});

import {Arbor} from "./Arbor.js";
export {Arbor};

import {CircuitGraphAnalysis} from "./circuit_graph_analysis.js";
export {CircuitGraphAnalysis}

import {InstanceRegistry, fetchSkeletons} from "./utils.js";
export {InstanceRegistry, fetchSkeletons};

import {SynapseClustering} from "./synapse_clustering.js";
export {SynapseClustering};

for (let obj of [window, global]) {
  if (obj) {
    obj.CATMAID = CATMAID;
    obj.requestQueue = requestQueue;
    obj.Arbor = Arbor;
    obj.CircuitGraphAnalysis = CircuitGraphAnalysis;
    obj.SynapseClustering = SynapseClustering;
    obj.InstanceRegistry = InstanceRegistry;
    obj.fetchSkeletons = fetchSkeletons;
  }
}
