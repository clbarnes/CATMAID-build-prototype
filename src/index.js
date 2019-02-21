// global: project, SkeletonAnnotations, CATMAID.TracingTool

// order dependent

import "./tools.js";
import "./events.js";
import "./request.js";
import {requestQueue} from "./CATMAID.js";
import "./error.js";
import "./state.js";
import "./command.js";

// order independent within ./models
import "./models/annotations.js";
import "./models/api.js";
import "./models/connectors.js";
import "./models/dataview.js";
import "./models/group.js";
import "./models/labels.js";
import "./models/landmarks.js";
import "./models/neuron.js";
import "./models/nodes.js";
import "./models/pointcloud.js";
import "./models/pointset.js";
import "./models/relations.js";
import "./models/sampler.js";
import "./models/similarity.js";
import "./models/skeleton.js";
import "./models/volumes.js";

import "./skeleton_source.js";
import "./datastores.js";
import "./settings-manager.js";

// order independent, probably

import {Arbor} from "./Arbor.js";
import "./active_skeleton.js";
import "./annotated-skeletons-cache.js";
import "./annotation-cache.js";
import "./arbor_parser.js";
import "./basic_skeleton_source.js";
import {CircuitGraphAnalysis} from "./circuit_graph_analysis.js";
import "./coalescing-promise-deduplicator.js";
import "./color-source.js";
import "./colorizer.js";
import "./connectivity_matrix.js";
import "./constants.js";
import "./cropping.js";
import "./filter.js";
import "./index.js";
import "./io.js";
import "./lru-cache.js";
import "./moving-least-squares-transform.js";
import "./neuron_name_service.js";
import "./serializer.js";
import "./shader.js";
import "./skeleton-operations.js";
import "./skeleton_source_manager.js";
import "./submitter.js";
import "./svg-factory.js";
import "./svgutil.js";
import {SynapseClustering} from "./synapse_clustering.js";
import "./time-series.js";
import {InstanceRegistry, fetchSkeletons} from "./utils.js";
import "./volumes.js";
import "./workflow.js";

import {CATMAID} from "./namespace.js";

export {CATMAID, requestQueue, Arbor, CircuitGraphAnalysis, SynapseClustering, InstanceRegistry, fetchSkeletons};

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
