## issues

- active_skeleton needs SkeletonAnnotations, CATMAID.TracingTool from static files
- requestQueue global needs to be overwritten to set up CSRF
- not sure if es6-promise stuff is necessary
- npm can't install d3 v3.4.11
  - Has a hard constraint on jsdom, which depends on a version of contextify incompatible with node 7+
- Other dependencies probably have version-related issues too
