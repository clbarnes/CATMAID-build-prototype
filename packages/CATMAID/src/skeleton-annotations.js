class Skeleton {
  constructor(id) {
    this.id = id;
  }

  getName() {
    return `Skeleton ${this.id}`;
  }
}

export class SkeletonAnnotations {
  EVENT_ACTIVE_NODE_CHANGED = "event_active_node_changed";
  EVENT_ACTIVE_NODE_JOINED = "event_active_node_joined";
  EVENT_ACTIVE_NODE_DELETED = "event_active_node_deleted";

  activeSkeleton = Skeleton(1);
  activeNodeId = 2;

  static getActiveSkeletonId() {
    return SkeletonAnnotations.activeSkeleton.id;
  }

  static getActiveNodeId() {
    return SkeletonAnnotations.activeNodeId;
  }

  static getChildOfVirtualNode(nodeId) {
    return nodeId + 1;
  }

  static isRealNode(nodeId) {
    return true;
  }
}
