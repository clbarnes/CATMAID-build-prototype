class Skeleton {
  constructor(id) {
    this.id = id;
  }

  getName() {
    return `Skeleton ${this.id}`;
  }
}

export class SkeletonAnnotations {
  // EVENT_ACTIVE_NODE_CHANGED = "event_active_node_changed";
  // EVENT_ACTIVE_NODE_JOINED = "event_active_node_joined";
  // EVENT_ACTIVE_NODE_DELETED = "event_active_node_deleted";
  //
  // activeSkeleton;
  // activeNodeId = 2;

  getActiveSkeletonId() {
    return SkeletonAnnotations.activeSkeleton.id;
  }

  getActiveNodeId() {
    return SkeletonAnnotations.activeNodeId;
  }

  getChildOfVirtualNode(nodeId) {
    return nodeId + 1;
  }

  isRealNode(nodeId) {
    return true;
  }
}
