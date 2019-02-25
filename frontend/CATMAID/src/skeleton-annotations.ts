class Skeleton {
  public id: number;

  constructor(id) {
    this.id = id;
  }

  getName() {
    return `Skeleton ${this.id}`;
  }
}

export class SkeletonAnnotations {
  public static EVENT_ACTIVE_NODE_CHANGED = "event_active_node_changed";
  public static EVENT_ACTIVE_NODE_JOINED = "event_active_node_joined";
  public static EVENT_ACTIVE_NODE_DELETED = "event_active_node_deleted";

  private static activeSkeleton: Skeleton;
  private static activeNodeId = 2;

  static getActiveSkeletonId() {
    return SkeletonAnnotations.activeSkeleton.id;
  }

  static getActiveNodeId() {
    return SkeletonAnnotations.activeNodeId;
  }

  static getChildOfVirtualNode(nodeId) {
    while (!this.isRealNode(nodeId)) {
      nodeId += 1;
    }
    return nodeId;
  }

  static isRealNode(nodeId) {
    return !!(nodeId % 2);
  }
}
